import { Router } from 'express'
import * as accomplishmentController from '../controllers/accomplishment.controller.js'
import { validate } from '../middlewares/validate.js'
import { validateId } from '../middlewares/validateId.js'
import { authenticate, authorize } from '../middlewares/authenticate.js'
import { validateAccomplishment, validateAccomplishmentPartial } from '../validators/accomplishment.validator.js'

const router = Router()
const adminOnly = [authenticate, authorize('admin')]

// Public
router.get('/', accomplishmentController.list)
router.get('/:id', validateId, accomplishmentController.getById)

// Admin only (requires a JWT from POST /api/auth/login)
router.post('/', adminOnly, validate(validateAccomplishment), accomplishmentController.create)
router.patch('/:id', adminOnly, validateId, validate(validateAccomplishmentPartial), accomplishmentController.update)
router.delete('/:id', adminOnly, validateId, accomplishmentController.remove)

export default router
