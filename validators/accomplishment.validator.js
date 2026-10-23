// [field, label, max length]
const TEXT_FIELDS = [
  ['metric', 'Metric', 20],
  ['title', 'Title', 150],
  ['organization', 'Organization', 120],
  ['body', 'Body', 1000],
]
const FIELDS = [...TEXT_FIELDS.map(([f]) => f), 'sortOrder']

// `partial: true` is for PATCH: fields are optional, but at least one must be present.
export function validateAccomplishment(input = {}, { partial = false } = {}) {
  const errors = {}

  for (const [field, label, max] of TEXT_FIELDS) {
    const value = input[field]
    if (value === undefined && partial) continue
    if (typeof value !== 'string' || !value.trim()) errors[field] = `${label} is required`
    else if (value.trim().length > max) errors[field] = `${label} must be at most ${max} characters`
  }

  if (input.sortOrder !== undefined && !Number.isInteger(input.sortOrder)) {
    errors.sortOrder = 'sortOrder must be an integer'
  }

  if (partial && !FIELDS.some((f) => input[f] !== undefined)) {
    errors.fields = `Provide at least one of: ${FIELDS.join(', ')}`
  }

  return errors
}

export const validateAccomplishmentPartial = (input) => validateAccomplishment(input, { partial: true })
