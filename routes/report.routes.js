import { Router } from 'express'
import * as reportController from '../controllers/report.controller.js'
import { validate } from '../middlewares/validate.js'
import { validateId } from '../middlewares/validateId.js'
import { authenticate, authorize } from '../middlewares/authenticate.js'
import { validateReport, validateReportPartial } from '../validators/report.validator.js'

const router = Router()
const adminOnly = [authenticate, authorize('admin')]

// Public
router.get('/', reportController.list)
router.get('/:id', validateId, reportController.getById)

// Admin only (requires a JWT from POST /api/auth/login).
// For an image: upload it first with POST /api/uploads/images, then send the returned url as `imageUrl`.
router.post('/', adminOnly, validate(validateReport), reportController.create)
router.patch('/:id', adminOnly, validateId, validate(validateReportPartial), reportController.update)
router.delete('/:id', adminOnly, validateId, reportController.remove)

export default router
