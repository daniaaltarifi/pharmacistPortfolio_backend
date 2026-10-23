import { Router } from 'express'
import * as experienceController from '../controllers/experience.controller.js'
import { validate } from '../middlewares/validate.js'
import { validateId } from '../middlewares/validateId.js'
import { authenticate, authorize } from '../middlewares/authenticate.js'
import { validateExperience, validateExperiencePartial } from '../validators/experience.validator.js'

const router = Router()
const adminOnly = [authenticate, authorize('admin')]

// Public
router.get('/', experienceController.list)

// Admin only (requires a JWT from POST /api/auth/login)
router.post('/', adminOnly, validate(validateExperience), experienceController.create)
router.patch('/:id', adminOnly, validateId, validate(validateExperiencePartial), experienceController.update)
router.delete('/:id', adminOnly, validateId, experienceController.remove)

export default router
