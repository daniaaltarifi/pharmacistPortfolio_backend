const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContact({ name, email, message } = {}) {
  const errors = {}
  if (typeof name !== 'string' || !name.trim()) errors.name = 'Name is required'
  else if (name.length > 120) errors.name = 'Name is too long'
  if (typeof email !== 'string' || !EMAIL_RE.test(email.trim())) errors.email = 'A valid email is required'
  if (typeof message !== 'string' || !message.trim()) errors.message = 'Message is required'
  else if (message.length > 5000) errors.message = 'Message is too long'
  return errors
}
