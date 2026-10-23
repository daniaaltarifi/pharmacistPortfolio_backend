import { AppError } from '../utils/AppError.js'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export function validateId(req, res, next) {
  if (!UUID_RE.test(req.params.id)) return next(new AppError('Invalid id', 400))
  next()
}
