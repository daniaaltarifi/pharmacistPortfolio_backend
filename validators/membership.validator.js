import { SECTORS } from '../models/membership.model.js'

// [field, label, max length]
const TEXT_FIELDS = [
  ['org', 'Organization', 150],
  ['role', 'Role', 150],
  ['period', 'Period', 100],
]
const FIELDS = [...TEXT_FIELDS.map(([f]) => f), 'sector', 'sortOrder']

// `partial: true` is for PATCH: fields are optional, but at least one must be present.
export function validateMembership(input = {}, { partial = false } = {}) {
  const errors = {}
  const { sector, sortOrder } = input

  for (const [field, label, max] of TEXT_FIELDS) {
    const value = input[field]
    if (value === undefined && partial) continue
    if (typeof value !== 'string' || !value.trim()) errors[field] = `${label} is required`
    else if (value.trim().length > max) errors[field] = `${label} must be at most ${max} characters`
  }

  if (sector !== undefined && sector !== null && !SECTORS.includes(sector)) {
    errors.sector = `sector must be one of: ${SECTORS.join(', ')} (or null)`
  }

  if (sortOrder !== undefined && !Number.isInteger(sortOrder)) {
    errors.sortOrder = 'sortOrder must be an integer'
  }

  if (partial && !FIELDS.some((f) => input[f] !== undefined)) {
    errors.fields = `Provide at least one of: ${FIELDS.join(', ')}`
  }

  return errors
}

export const validateMembershipPartial = (input) => validateMembership(input, { partial: true })
