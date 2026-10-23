import { verifyToken } from '../services/auth.service.js'
import { User } from '../models/index.js'
import { AppError } from '../utils/AppError.js'

// Requires a valid JWT: Authorization: Bearer <token> (get one from POST /api/auth/login).
// The token must also match the user's current tokenVersion, so a logout ends it right away.
export async function authenticate(req, res, next) {
  const [scheme, token] = (req.get('authorization') || '').split(' ')
  if (scheme !== 'Bearer' || !token) return next(new AppError('Authentication required', 401))

  let payload
  try {
    payload = verifyToken(token)
  } catch (err) {
    return next(new AppError(err.name === 'TokenExpiredError' ? 'Token expired' : 'Invalid token', 401))
  }

  try {
    const user = await User.findByPk(payload.sub, { attributes: ['id', 'role', 'tokenVersion'] })
    // Tokens issued before this check existed have no `ver`; they count as version 0.
    if (!user || user.tokenVersion !== (payload.ver ?? 0)) return next(new AppError('Session ended', 401))
    req.user = { id: user.id, role: user.role }
    next()
  } catch (err) {
    next(err)
  }
}

// Use after `authenticate`, e.g. authorize('admin').
export const authorize =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user?.role)) return next(new AppError('Forbidden', 403))
    next()
  }
