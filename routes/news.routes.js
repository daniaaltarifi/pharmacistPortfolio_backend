import { Router } from 'express'
import * as newsController from '../controllers/news.controller.js'
import { validate } from '../middlewares/validate.js'
import { validateId } from '../middlewares/validateId.js'
import { authenticate, authorize } from '../middlewares/authenticate.js'
import { validateNews, validateNewsPartial } from '../validators/news.validator.js'

const router = Router()
const adminOnly = [authenticate, authorize('admin')]

// Public
router.get('/', newsController.list) // optional ?categoryId=<uuid>
router.get('/:id', validateId, newsController.getById)

// Admin only (requires a JWT from POST /api/auth/login)
router.post('/', adminOnly, validate(validateNews), newsController.create)
router.patch('/:id', adminOnly, validateId, validate(validateNewsPartial), newsController.update)
router.delete('/:id', adminOnly, validateId, newsController.remove)

export default router
