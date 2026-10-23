import { Router } from 'express'
import { submitContact, list, remove, autoReply, customReply } from '../controllers/contact.controller.js'
import { validate } from '../middlewares/validate.js'
import { validateId } from '../middlewares/validateId.js'
import { authenticate, authorize } from '../middlewares/authenticate.js'
import { validateContact } from '../validators/contact.validator.js'
import { validateContactReply } from '../validators/contactReply.validator.js'

const router = Router()
const adminOnly = [authenticate, authorize('admin')]

// Public: the portfolio's contact form.
router.post('/', validate(validateContact), submitContact)

// Admin only: read and delete messages in the dashboard inbox.
router.get('/', adminOnly, list)
router.delete('/:id', adminOnly, validateId, remove)

// Admin only: email the visitor back.
// Auto reply = the fixed text in templates/autoReply.js (no body needed).
router.post('/:id/reply/auto', adminOnly, validateId, autoReply)
// Custom reply = { subject, body } written in the dashboard.
router.post('/:id/reply', adminOnly, validateId, validate(validateContactReply), customReply)

export default router
