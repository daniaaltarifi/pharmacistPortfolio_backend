import { deleteImage, storagePathFromUrl } from './storage.service.js'

// Deletes an uploaded image from Supabase Storage once no record uses it any more.
// - Only touches files in our bucket (site paths like "/images/..." are left alone).
// - Skips the file if any record in any table still points to it (the same upload can be reused).
// - Never throws: a failed cleanup must not fail the admin's update/delete; it is only logged.
export async function removeImageIfUnused(url, imageModels) {
  const path = storagePathFromUrl(url)
  if (!path) return

  try {
    for (const model of imageModels) {
      if (await model.count({ where: { imageUrl: url } })) return
    }
    await deleteImage(path)
    console.log(`🗑️  Removed unused image from storage: ${path}`)
  } catch (err) {
    console.warn(`⚠️  Could not remove old image "${path}" from storage: ${err.message}`)
  }
}

// Adds hooks to every model with an `imageUrl` column:
//   - image replaced or cleared (PATCH)  -> old file removed
//   - record deleted                      -> its file removed
// Deletes must use `destroy({ where, individualHooks: true })` so the hook sees the deleted row.
export function registerImageCleanup(imageModels) {
  for (const model of imageModels) {
    model.addHook('beforeUpdate', 'rememberOldImage', (instance) => {
      if (instance.changed('imageUrl')) instance._oldImageUrl = instance.previous('imageUrl')
    })
    model.addHook('afterUpdate', 'removeOldImage', async (instance) => {
      const oldUrl = instance._oldImageUrl
      instance._oldImageUrl = undefined
      if (oldUrl && oldUrl !== instance.imageUrl) await removeImageIfUnused(oldUrl, imageModels)
    })
    model.addHook('afterDestroy', 'removeDeletedImage', async (instance) => {
      if (instance.imageUrl) await removeImageIfUnused(instance.imageUrl, imageModels)
    })
  }
}
