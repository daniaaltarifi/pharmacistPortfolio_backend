// [field, label, max length]
const TEXT_FIELDS = [
  ['title', 'Title', 200],
  ['provider', 'Provider', 200],
]
const FIELDS = [...TEXT_FIELDS.map(([f]) => f), 'year']

const isYear = (v) => Number.isInteger(v) && v >= 1900 && v <= 2100

// `partial: true` is for PATCH: fields are optional, but at least one must be present.
export function validateTraining(input = {}, { partial = false } = {}) {
  const errors = {}

  for (const [field, label, max] of TEXT_FIELDS) {
    const value = input[field]
    if (value === undefined && partial) continue
    if (typeof value !== 'string' || !value.trim()) errors[field] = `${label} is required`
    else if (value.trim().length > max) errors[field] = `${label} must be at most ${max} characters`
  }

  if (input.year !== undefined || !partial) {
    if (!isYear(input.year)) errors.year = 'year must be a number between 1900 and 2100'
  }

  if (partial && !FIELDS.some((f) => input[f] !== undefined)) {
    errors.fields = `Provide at least one of: ${FIELDS.join(', ')}`
  }

  return errors
}

export const validateTrainingPartial = (input) => validateTraining(input, { partial: true })
