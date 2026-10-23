// [field, label, max length]
const TEXT_FIELDS = [
  ['title', 'Title', 200],
  ['description', 'Description', 2000],
]
const FIELDS = [...TEXT_FIELDS.map(([f]) => f), 'highlights', 'imageUrl']
const MAX_HIGHLIGHTS = 10
const MAX_HIGHLIGHT_LENGTH = 60

// Site-relative path ("/images/...") or an absolute http(s) URL.
const isImageUrl = (v) => typeof v === 'string' && v.length <= 500 && /^(\/[^\s]*|https?:\/\/[^\s]+)$/.test(v)

function validateHighlights(highlights) {
  if (!Array.isArray(highlights)) return 'highlights must be an array of strings'
  if (highlights.length > MAX_HIGHLIGHTS) return `At most ${MAX_HIGHLIGHTS} highlights are allowed`
  if (highlights.some((h) => typeof h !== 'string' || !h.trim())) return 'Every highlight must be a non-empty string'
  if (highlights.some((h) => h.trim().length > MAX_HIGHLIGHT_LENGTH))
    return `Each highlight must be at most ${MAX_HIGHLIGHT_LENGTH} characters`
  return null
}

// `partial: true` is for PATCH: fields are optional, but at least one must be present.
export function validateProject(input = {}, { partial = false } = {}) {
  const errors = {}
  const { highlights, imageUrl } = input

  for (const [field, label, max] of TEXT_FIELDS) {
    const value = input[field]
    if (value === undefined && partial) continue
    if (typeof value !== 'string' || !value.trim()) errors[field] = `${label} is required`
    else if (value.trim().length > max) errors[field] = `${label} must be at most ${max} characters`
  }

  // Optional on create (defaults to []); when sent, it replaces the whole list.
  if (highlights !== undefined) {
    const highlightsError = validateHighlights(highlights)
    if (highlightsError) errors.highlights = highlightsError
  }

  if (imageUrl !== undefined && imageUrl !== null && !isImageUrl(imageUrl)) {
    errors.imageUrl = 'imageUrl must be a path starting with "/" or an http(s) URL (max 500 characters)'
  }

  if (partial && !FIELDS.some((f) => input[f] !== undefined)) {
    errors.fields = `Provide at least one of: ${FIELDS.join(', ')}`
  }

  return errors
}

export const validateProjectPartial = (input) => validateProject(input, { partial: true })
