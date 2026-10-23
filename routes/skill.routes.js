import { Router } from 'express'
import * as skillController from '../controllers/skill.controller.js'
import { validate } from '../middlewares/validate.js'
import { validateId } from '../middlewares/validateId.js'
import { authenticate, authorize } from '../middlewares/authenticate.js'
import { validateSkill, validateSkillPartial } from '../validators/skill.validator.js'

const router = Router()
const adminOnly = [authenticate, authorize('admin')]

// Public
router.get('/', skillController.list)
router.get('/:id', validateId, skillController.getById)

// Admin only (requires a JWT from POST /api/auth/login)
router.post('/', adminOnly, validate(validateSkill), skillController.create)
router.patch('/:id', adminOnly, validateId, validate(validateSkillPartial), skillController.update)
router.delete('/:id', adminOnly, validateId, skillController.remove)

export default router
