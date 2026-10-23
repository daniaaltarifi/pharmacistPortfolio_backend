import { Router } from 'express'
import * as eventController from '../controllers/event.controller.js'
import { validate } from '../middlewares/validate.js'
import { validateId } from '../middlewares/validateId.js'
import { authenticate, authorize } from '../middlewares/authenticate.js'
import { validateEvent, validateEventPartial } from '../validators/event.validator.js'

const router = Router()
const adminOnly = [authenticate, authorize('admin')]

// Public
router.get('/', eventController.list)
router.get('/:id', validateId, eventController.getById)

// Admin only (requires a JWT from POST /api/auth/login)
router.post('/', adminOnly, validate(validateEvent), eventController.create)
router.patch('/:id', adminOnly, validateId, validate(validateEventPartial), eventController.update)
router.delete('/:id', adminOnly, validateId, eventController.remove)

export default router
