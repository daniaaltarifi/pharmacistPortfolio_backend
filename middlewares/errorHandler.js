import { AppError } from '../utils/AppError.js'

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  // Model-level validation (e.g. unique email, string length) -> 400 with per-field messages.
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    const errors = Object.fromEntries(err.errors.map((e) => [e.path, e.message]))
    return res.status(400).json({ error: 'Invalid submission', errors })
  }

  const status = err.status || 500
  if (status >= 500) console.error(err)

  // AppErrors are thrown on purpose with a safe message (e.g. 503 "storage not configured");
  // anything else is unexpected, so its details stay in the server log only.
  const expose = err instanceof AppError || status < 500
  res.status(status).json({
    error: expose ? err.message : 'Internal server error',
    ...(err.details && { errors: err.details }),
  })
}
