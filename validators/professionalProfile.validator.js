// [field, label, max length]
const TEXT_FIELDS = [
  ['role', 'Role', 150],
  ['org', 'Organization', 150],
  ['place', 'Place', 120],
  ['summary', 'Summary', 1000],
]
const FIELDS = [...TEXT_FIELDS.map(([f]) => f), 'startYear', 'endYear', 'points', 'sortOrder']
const MAX_POINTS = 20
const MAX_POINT_LENGTH = 500

const isYear = (v) => Number.isInteger(v) && v >= 1900 && v <= 2100

// `partial: true` is for PATCH: fields are optional, but at least one must be present.
export function validateProfile(input = {}, { partial = false } = {}) {
  const errors = {}
  const { startYear, endYear, points, sortOrder } = input

  for (const [field, label, max] of TEXT_FIELDS) {
    const value = input[field]
    if (value === undefined && partial) continue
    if (typeof value !== 'string' || !value.trim()) errors[field] = `${label} is required`
    else if (value.trim().length > max) errors[field] = `${label} must be at most ${max} characters`
  }

  if (startYear !== undefined || !partial) {
    if (!isYear(startYear)) errors.startYear = 'startYear must be a year between 1900 and 2100'
  }

  // endYear: null means "Present".
  if (endYear !== undefined && endYear !== null) {
    if (!isYear(endYear)) errors.endYear = 'endYear must be a year between 1900 and 2100, or null for Present'
    else if (isYear(startYear) && endYear < startYear) errors.endYear = 'endYear cannot be before startYear'
  }

  if (points !== undefined) {
    if (!Array.isArray(points)) errors.points = 'points must be an array of strings'
    else if (points.length > MAX_POINTS) errors.points = `At most ${MAX_POINTS} points are allowed`
    else if (points.some((p) => typeof p !== 'string' || !p.trim())) errors.points = 'Every point must be a non-empty string'
    else if (points.some((p) => p.trim().length > MAX_POINT_LENGTH))
      errors.points = `Each point must be at most ${MAX_POINT_LENGTH} characters`
  }

  if (sortOrder !== undefined && !Number.isInteger(sortOrder)) {
    errors.sortOrder = 'sortOrder must be an integer'
  }

  if (partial && !FIELDS.some((f) => input[f] !== undefined)) {
    errors.fields = `Provide at least one of: ${FIELDS.join(', ')}`
  }

  return errors
}

export const validateProfilePartial = (input) => validateProfile(input, { partial: true })
