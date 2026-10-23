import { Router } from 'express'
import * as uploadController from '../controllers/upload.controller.js'
import { authenticate, authorize } from '../middlewares/authenticate.js'
import { uploadSingleImage } from '../middlewares/uploadImage.js'

const router = Router()

// Admin only. form-data field "file" -> { data: { url, path, contentType, size } }.
// Then send `url` as `imageUrl` when creating/updating news, events, awards, ...
router.post('/images', authenticate, authorize('admin'), uploadSingleImage, uploadController.uploadImage)

export default router
