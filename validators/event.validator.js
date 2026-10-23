// [field, label, max length]
const TEXT_FIELDS = [
  ['role', 'Role', 100],
  ['title', 'Title', 200],
  ['summary', 'Summary', 2000],
  ['location', 'Location', 150],
]
const FIELDS = [...TEXT_FIELDS.map(([f]) => f), 'eventDate', 'imageUrl', 'link']

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/
const isValidDate = (v) => typeof v === 'string' && DATE_RE.test(v) && !Number.isNaN(Date.parse(v))
// Site-relative path ("/images/...") or an absolute http(s) URL.
const isImageUrl = (v) => typeof v === 'string' && v.length <= 500 && /^(\/[^\s]*|https?:\/\/[^\s]+)$/.test(v)
// Absolute http(s) URL only: links point to external pages.
const isLink = (v) => {
  if (typeof v !== 'string' || v.length > 500) return false
  try {
    return ['http:', 'https:'].includes(new URL(v).protocol)
  } catch {
    return false
  }
}

// `partial: true` is for PATCH: fields are optional, but at least one must be present.
export function validateEvent(input = {}, { partial = false } = {}) {
  const errors = {}
  const { eventDate, imageUrl, link } = input

  for (const [field, label, max] of TEXT_FIELDS) {
    const value = input[field]
    if (value === undefined && partial) continue
    if (typeof value !== 'string' || !value.trim()) errors[field] = `${label} is required`
    else if (value.trim().length > max) errors[field] = `${label} must be at most ${max} characters`
  }

  if (eventDate !== undefined || !partial) {
    if (!isValidDate(eventDate)) errors.eventDate = 'eventDate must be a date in YYYY-MM-DD format'
  }

  if (imageUrl !== undefined && imageUrl !== null && !isImageUrl(imageUrl)) {
    errors.imageUrl = 'imageUrl must be a path starting with "/" or an http(s) URL (max 500 characters)'
  }

  // null or "" clears the link.
  if (link !== undefined && link !== null && link !== '' && !isLink(link)) {
    errors.link = 'link must be a full http(s) URL, e.g. https://example.com/article (max 500 characters)'
  }

  if (partial && !FIELDS.some((f) => input[f] !== undefined)) {
    errors.fields = `Provide at least one of: ${FIELDS.join(', ')}`
  }

  return errors
}

export const validateEventPartial = (input) => validateEvent(input, { partial: true })
