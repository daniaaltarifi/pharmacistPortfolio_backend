// Same rules for POST and PATCH: name is the only field, so it is always required.
export function validateNewsCategory({ name } = {}) {
  const errors = {}
  if (typeof name !== 'string' || !name.trim()) errors.name = 'Name is required'
  else if (name.trim().length > 50) errors.name = 'Name must be at most 50 characters'
  return errors
}
