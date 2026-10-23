import { Router } from 'express'
import * as profileController from '../controllers/professionalProfile.controller.js'
import { validate } from '../middlewares/validate.js'
import { validateId } from '../middlewares/validateId.js'
import { authenticate, authorize } from '../middlewares/authenticate.js'
import { validateProfile, validateProfilePartial } from '../validators/professionalProfile.validator.js'

const router = Router()
const adminOnly = [authenticate, authorize('admin')]

// Public
router.get('/', profileController.list)
router.get('/:id', validateId, profileController.getById)

// Admin only (requires a JWT from POST /api/auth/login)
router.post('/', adminOnly, validate(validateProfile), profileController.create)
router.patch('/:id', adminOnly, validateId, validate(validateProfilePartial), profileController.update)
router.delete('/:id', adminOnly, validateId, profileController.remove)

export default router
