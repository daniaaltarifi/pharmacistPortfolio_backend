import { AppError } from '../utils/AppError.js'

// Wraps a validator `(body) => errors` into Express middleware.
export const validate = (validator) => (req, res, next) => {
  const errors = validator(req.body)
  if (Object.keys(errors).length) return next(new AppError('Invalid submission', 400, errors))
  next()
}
