export function validateLogin({ email, password } = {}) {
  const errors = {}
  if (typeof email !== 'string' || !email.trim()) errors.email = 'Email is required'
  if (typeof password !== 'string' || !password) errors.password = 'Password is required'
  return errors
}
