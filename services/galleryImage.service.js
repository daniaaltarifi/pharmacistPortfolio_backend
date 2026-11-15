import { GalleryImage } from '../models/index.js'
import { AppError } from '../utils/AppError.js'

// Newest first.
export async function listGalleryImages() {
  return GalleryImage.findAll({ order: [['createdAt', 'DESC']] })
}

export async function getGalleryImage(id) {
  const image = await GalleryImage.findByPk(id)
  if (!image) throw new AppError('Image not found', 404)
  return image
}

// Empty or whitespace-only titles are stored as null.
const cleanTitle = (title) => (typeof title === 'string' && title.trim() ? title.trim() : null)

export async function createGalleryImage({ imageUrl, title }) {
  return GalleryImage.create({ imageUrl: imageUrl.trim(), title: cleanTitle(title) })
}

// Replaces the photo, keeping its place in the gallery. A missing title is left unchanged; null clears it.
export async function updateGalleryImage(id, { imageUrl, title }) {
  const image = await getGalleryImage(id)
  return image.update({
    imageUrl: imageUrl.trim(),
    ...(title !== undefined && { title: cleanTitle(title) }),
  })
}

export async function deleteGalleryImage(id) {
  const deleted = await GalleryImage.destroy({ where: { id }, individualHooks: true }) // runs the image-cleanup hook
  if (!deleted) throw new AppError('Image not found', 404)
}
