import { Router } from 'express'
import * as galleryController from '../controllers/galleryImage.controller.js'
import { validate } from '../middlewares/validate.js'
import { validateId } from '../middlewares/validateId.js'
import { authenticate, authorize } from '../middlewares/authenticate.js'
import { validateGalleryImage } from '../validators/galleryImage.validator.js'

const router = Router()
const adminOnly = [authenticate, authorize('admin')]

// Public
router.get('/', galleryController.list)
router.get('/:id', validateId, galleryController.getById)

// Admin only (requires a JWT from POST /api/auth/login).
// Upload the photo first with POST /api/uploads/images, then send the returned url as `imageUrl`.
router.post('/', adminOnly, validate(validateGalleryImage), galleryController.create)
router.patch('/:id', adminOnly, validateId, validate(validateGalleryImage), galleryController.update)
router.delete('/:id', adminOnly, validateId, galleryController.remove)

export default router
