import { Router } from 'express'
import * as categoryController from '../controllers/newsCategory.controller.js'
import { validate } from '../middlewares/validate.js'
import { validateId } from '../middlewares/validateId.js'
import { authenticate, authorize } from '../middlewares/authenticate.js'
import { validateNewsCategory } from '../validators/newsCategory.validator.js'

const router = Router()
const adminOnly = [authenticate, authorize('admin')]

// Public
router.get('/', categoryController.list)
router.get('/:id', validateId, categoryController.getById)

// Admin only (requires a JWT from POST /api/auth/login)
router.post('/', adminOnly, validate(validateNewsCategory), categoryController.create)
router.patch('/:id', adminOnly, validateId, validate(validateNewsCategory), categoryController.update)
router.delete('/:id', adminOnly, validateId, categoryController.remove)

export default router
