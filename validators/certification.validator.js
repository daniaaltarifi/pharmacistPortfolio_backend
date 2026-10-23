// [field, label, max length]
const TEXT_FIELDS = [
  ['title', 'Title', 200],
  ['description', 'Description', 2000],
  ['institution', 'Institution', 200],
]
const FIELDS = [...TEXT_FIELDS.map(([f]) => f), 'year', 'imageUrl']

const isYear = (v) => Number.isInteger(v) && v >= 1900 && v <= 2100
// Site-relative path ("/images/...") or an absolute http(s) URL.
const isImageUrl = (v) => typeof v === 'string' && v.length <= 500 && /^(\/[^\s]*|https?:\/\/[^\s]+)$/.test(v)

// `partial: true` is for PATCH: fields are optional, but at least one must be present.
export function validateCertification(input = {}, { partial = false } = {}) {
  const errors = {}
  const { year, imageUrl } = input

  for (const [field, label, max] of TEXT_FIELDS) {
    const value = input[field]
    if (value === undefined && partial) continue
    if (typeof value !== 'string' || !value.trim()) errors[field] = `${label} is required`
    else if (value.trim().length > max) errors[field] = `${label} must be at most ${max} characters`
  }

  if (year !== undefined || !partial) {
    if (!isYear(year)) errors.year = 'year must be a number between 1900 and 2100'
  }

  if (imageUrl !== undefined && imageUrl !== null && !isImageUrl(imageUrl)) {
    errors.imageUrl = 'imageUrl must be a path starting with "/" or an http(s) URL (max 500 characters)'
  }

  if (partial && !FIELDS.some((f) => input[f] !== undefined)) {
    errors.fields = `Provide at least one of: ${FIELDS.join(', ')}`
  }

  return errors
}

export const validateCertificationPartial = (input) => validateCertification(input, { partial: true })
