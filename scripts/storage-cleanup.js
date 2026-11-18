// Finds uploaded images that no record uses any more (e.g. uploaded in the dashboard but never saved,
// or replaced before automatic cleanup existed) and optionally deletes them.
//   npm run storage:cleanup              -> list unused files only (safe)
//   npm run storage:cleanup -- --delete  -> delete them
import { sequelize, News, Event, Award, Certification, Project, Report, GalleryImage, Training } from '../models/index.js'
import { deleteImage, listAllImagePaths, storagePathFromUrl } from '../services/storage.service.js'

const IMAGE_MODELS = [News, Event, Award, Certification, Project, Report, GalleryImage, Training]
const shouldDelete = process.argv.includes('--delete')

try {
  // Every storage path a record points to.
  const used = new Set()
  for (const model of IMAGE_MODELS) {
    const rows = await model.findAll({ attributes: ['imageUrl'], raw: true })
    for (const { imageUrl } of rows) {
      const path = storagePathFromUrl(imageUrl)
      if (path) used.add(path)
    }
  }

  const all = await listAllImagePaths()
  const unused = all.filter((path) => !used.has(path))

  console.log(`📦 Files in storage: ${all.length} · used by records: ${all.length - unused.length} · unused: ${unused.length}`)
  for (const path of unused) console.log(`   - ${path}`)

  if (!unused.length) {
    console.log('✅ Nothing to clean up')
  } else if (!shouldDelete) {
    console.log('\nNothing deleted. Run `npm run storage:cleanup -- --delete` to remove the files above.')
  } else {
    for (const path of unused) await deleteImage(path)
    console.log(`✅ Deleted ${unused.length} unused file(s)`)
  }
} catch (err) {
  console.error('❌ Storage cleanup failed:', err.message)
  process.exitCode = 1
} finally {
  await sequelize.close()
}
