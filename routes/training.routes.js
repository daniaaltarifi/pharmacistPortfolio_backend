import { Router } from 'express'
import * as trainingController from '../controllers/training.controller.js'
import { validate } from '../middlewares/validate.js'
import { validateId } from '../middlewares/validateId.js'
import { authenticate, authorize } from '../middlewares/authenticate.js'
import { validateTraining, validateTrainingPartial } from '../validators/training.validator.js'

const router = Router()
const adminOnly = [authenticate, authorize('admin')]

// Public
router.get('/', trainingController.list)
router.get('/:id', validateId, trainingController.getById)

// Admin only (requires a JWT from POST /api/auth/login)
router.post('/', adminOnly, validate(validateTraining), trainingController.create)
router.patch('/:id', adminOnly, validateId, validate(validateTrainingPartial), trainingController.update)
router.delete('/:id', adminOnly, validateId, trainingController.remove)

export default router
