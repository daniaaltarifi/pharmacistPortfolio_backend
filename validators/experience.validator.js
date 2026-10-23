const FIELDS = ['title', 'body', 'sortOrder']

// `partial: true` is for PATCH: fields are optional, but at least one must be present.
export function validateExperience(input = {}, { partial = false } = {}) {
  const errors = {}
  const { title, body, sortOrder } = input

  if (title !== undefined || !partial) {
    if (typeof title !== 'string' || !title.trim()) errors.title = 'Title is required'
    else if (title.trim().length > 120) errors.title = 'Title must be at most 120 characters'
  }

  if (body !== undefined || !partial) {
    if (typeof body !== 'string' || !body.trim()) errors.body = 'Body is required'
    else if (body.trim().length > 1000) errors.body = 'Body must be at most 1000 characters'
  }

  if (sortOrder !== undefined && !Number.isInteger(sortOrder)) {
    errors.sortOrder = 'sortOrder must be an integer'
  }

  if (partial && !FIELDS.some((f) => input[f] !== undefined)) {
    errors.fields = `Provide at least one of: ${FIELDS.join(', ')}`
  }

  return errors
}

export const validateExperiencePartial = (input) => validateExperience(input, { partial: true })
