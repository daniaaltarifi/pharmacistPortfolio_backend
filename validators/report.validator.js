// [field, label, max length]
const TEXT_FIELDS = [
  ['title', 'Title', 200],
  ['description', 'Description', 20000],
]
const FIELDS = [...TEXT_FIELDS.map(([f]) => f), 'publishedAt', 'imageUrl']

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/
const isValidDate = (v) => typeof v === 'string' && DATE_RE.test(v) && !Number.isNaN(Date.parse(v))
// Site-relative path ("/images/...") or an absolute http(s) URL.
const isImageUrl = (v) => typeof v === 'string' && v.length <= 500 && /^(\/[^\s]*|https?:\/\/[^\s]+)$/.test(v)

// `partial: true` is for PATCH: fields are optional, but at least one must be present.
export function validateReport(input = {}, { partial = false } = {}) {
  const errors = {}
  const { publishedAt, imageUrl } = input

  for (const [field, label, max] of TEXT_FIELDS) {
    const value = input[field]
    if (value === undefined && partial) continue
    if (typeof value !== 'string' || !value.trim()) errors[field] = `${label} is required`
    else if (value.trim().length > max) errors[field] = `${label} must be at most ${max} characters`
  }

  if (publishedAt !== undefined || !partial) {
    if (!isValidDate(publishedAt)) errors.publishedAt = 'publishedAt must be a date in YYYY-MM-DD format'
  }

  if (imageUrl !== undefined && imageUrl !== null && !isImageUrl(imageUrl)) {
    errors.imageUrl = 'imageUrl must be a path starting with "/" or an http(s) URL (max 500 characters)'
  }

  if (partial && !FIELDS.some((f) => input[f] !== undefined)) {
    errors.fields = `Provide at least one of: ${FIELDS.join(', ')}`
  }

  return errors
}

export const validateReportPartial = (input) => validateReport(input, { partial: true })
