import { Router } from 'express'
import * as certificationController from '../controllers/certification.controller.js'
import { validate } from '../middlewares/validate.js'
import { validateId } from '../middlewares/validateId.js'
import { authenticate, authorize } from '../middlewares/authenticate.js'
import { validateCertification, validateCertificationPartial } from '../validators/certification.validator.js'

const router = Router()
const adminOnly = [authenticate, authorize('admin')]

// Public
router.get('/', certificationController.list)
router.get('/:id', validateId, certificationController.getById)

// Admin only (requires a JWT from POST /api/auth/login).
// For an image: upload it first with POST /api/uploads/images, then send the returned url as `imageUrl`.
router.post('/', adminOnly, validate(validateCertification), certificationController.create)
router.patch('/:id', adminOnly, validateId, validate(validateCertificationPartial), certificationController.update)
router.delete('/:id', adminOnly, validateId, certificationController.remove)

export default router
