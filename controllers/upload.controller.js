import * as storageService from '../services/storage.service.js'

export async function uploadImage(req, res) {
  const image = await storageService.uploadImage(req.file.buffer)
  res.status(201).json({ data: image })
}
