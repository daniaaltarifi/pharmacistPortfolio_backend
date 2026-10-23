import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import * as authController from '../controllers/auth.controller.js'
import { validate } from '../middlewares/validate.js'
import { authenticate } from '../middlewares/authenticate.js'
import { validateLogin } from '../validators/auth.validator.js'

const router = Router()

// Slow down password guessing: 10 attempts per 15 minutes per IP.
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { error: 'Too many login attempts, please try again later' },
})

router.post('/login', loginLimiter, validate(validateLogin), authController.login)
router.get('/me', authenticate, authController.me)
// Signs this user out everywhere: every token issued before now stops working.
router.post('/logout', authenticate, authController.logout)

export default router
