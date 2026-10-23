import { Router } from 'express'
import * as awardController from '../controllers/award.controller.js'
import { validate } from '../middlewares/validate.js'
import { validateId } from '../middlewares/validateId.js'
import { authenticate, authorize } from '../middlewares/authenticate.js'
import { validateAward, validateAwardPartial } from '../validators/award.validator.js'

const router = Router()
const adminOnly = [authenticate, authorize('admin')]

// Public
router.get('/', awardController.list)
router.get('/:id', validateId, awardController.getById)

// Admin only (requires a JWT from POST /api/auth/login).
// For an image: upload it first with POST /api/uploads/images, then send the returned url as `imageUrl`.
router.post('/', adminOnly, validate(validateAward), awardController.create)
router.patch('/:id', adminOnly, validateId, validate(validateAwardPartial), awardController.update)
router.delete('/:id', adminOnly, validateId, awardController.remove)

export default router
