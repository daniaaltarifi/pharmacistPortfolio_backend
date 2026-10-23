import { Router } from 'express'
import * as projectController from '../controllers/project.controller.js'
import { validate } from '../middlewares/validate.js'
import { validateId } from '../middlewares/validateId.js'
import { authenticate, authorize } from '../middlewares/authenticate.js'
import { validateProject, validateProjectPartial } from '../validators/project.validator.js'

const router = Router()
const adminOnly = [authenticate, authorize('admin')]

// Public
router.get('/', projectController.list)
router.get('/:id', validateId, projectController.getById)

// Admin only (requires a JWT from POST /api/auth/login).
// For an image: upload it first with POST /api/uploads/images, then send the returned url as `imageUrl`.
router.post('/', adminOnly, validate(validateProject), projectController.create)
router.patch('/:id', adminOnly, validateId, validate(validateProjectPartial), projectController.update)
router.delete('/:id', adminOnly, validateId, projectController.remove)

export default router
