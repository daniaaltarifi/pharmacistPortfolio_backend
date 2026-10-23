import * as galleryService from '../services/galleryImage.service.js'

export async function list(req, res) {
  const images = await galleryService.listGalleryImages()
  res.json({ data: images })
}

export async function getById(req, res) {
  const image = await galleryService.getGalleryImage(req.params.id)
  res.json({ data: image })
}

export async function create(req, res) {
  const image = await galleryService.createGalleryImage(req.body)
  res.status(201).json({ data: image })
}

export async function update(req, res) {
  const image = await galleryService.updateGalleryImage(req.params.id, req.body)
  res.json({ data: image })
}

export async function remove(req, res) {
  await galleryService.deleteGalleryImage(req.params.id)
  res.status(204).end()
}
