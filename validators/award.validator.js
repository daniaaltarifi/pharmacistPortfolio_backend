// [field, label, max length] — required text fields
const TEXT_FIELDS = [
  ['title', 'Title', 200],
  ['issuer', 'Issuer', 200],
]
const FIELDS = [...TEXT_FIELDS.map(([f]) => f), 'year', 'description', 'imageUrl']

const isYear = (v) => Number.isInteger(v) && v >= 1900 && v <= 2100
// Site-relative path ("/images/...") or an absolute http(s) URL.
const isImageUrl = (v) => typeof v === 'string' && v.length <= 500 && /^(\/[^\s]*|https?:\/\/[^\s]+)$/.test(v)

// `partial: true` is for PATCH: fields are optional, but at least one must be present.
export function validateAward(input = {}, { partial = false } = {}) {
  const errors = {}
  const { year, description, imageUrl } = input

  for (const [field, label, max] of TEXT_FIELDS) {
    const value = input[field]
    if (value === undefined && partial) continue
    if (typeof value !== 'string' || !value.trim()) errors[field] = `${label} is required`
    else if (value.trim().length > max) errors[field] = `${label} must be at most ${max} characters`
  }

  if (year !== undefined || !partial) {
    if (!isYear(year)) errors.year = 'year must be a number between 1900 and 2100'
  }

  // Optional; null clears it.
  if (description !== undefined && description !== null) {
    if (typeof description !== 'string') errors.description = 'description must be text'
    else if (description.trim().length > 2000) errors.description = 'description must be at most 2000 characters'
  }

  if (imageUrl !== undefined && imageUrl !== null && !isImageUrl(imageUrl)) {
    errors.imageUrl = 'imageUrl must be a path starting with "/" or an http(s) URL (max 500 characters)'
  }

  if (partial && !FIELDS.some((f) => input[f] !== undefined)) {
    errors.fields = `Provide at least one of: ${FIELDS.join(', ')}`
  }

  return errors
}

export const validateAwardPartial = (input) => validateAward(input, { partial: true })
