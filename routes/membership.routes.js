import { Router } from 'express'
import * as membershipController from '../controllers/membership.controller.js'
import { validate } from '../middlewares/validate.js'
import { validateId } from '../middlewares/validateId.js'
import { authenticate, authorize } from '../middlewares/authenticate.js'
import { validateMembership, validateMembershipPartial } from '../validators/membership.validator.js'

const router = Router()
const adminOnly = [authenticate, authorize('admin')]

// Public
router.get('/', membershipController.list)
router.get('/:id', validateId, membershipController.getById)

// Admin only (requires a JWT from POST /api/auth/login)
router.post('/', adminOnly, validate(validateMembership), membershipController.create)
router.patch('/:id', adminOnly, validateId, validate(validateMembershipPartial), membershipController.update)
router.delete('/:id', adminOnly, validateId, membershipController.remove)

export default router
