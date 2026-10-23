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

export async function createGalleryImage({ imageUrl }) {
  return GalleryImage.create({ imageUrl: imageUrl.trim() })
}

// Replaces the photo, keeping its place in the gallery.
export async function updateGalleryImage(id, { imageUrl }) {
  const image = await getGalleryImage(id)
  return image.update({ imageUrl: imageUrl.trim() })
}

export async function deleteGalleryImage(id) {
  const deleted = await GalleryImage.destroy({ where: { id } })
  if (!deleted) throw new AppError('Image not found', 404)
}
