const FIELDS = ['name', 'symbol', 'sortOrder']

// `partial: true` is for PATCH: fields are optional, but at least one must be present.
export function validateSkill(input = {}, { partial = false } = {}) {
  const errors = {}
  const { name, symbol, sortOrder } = input

  if (name !== undefined || !partial) {
    if (typeof name !== 'string' || !name.trim()) errors.name = 'Name is required'
    else if (name.trim().length > 100) errors.name = 'Name must be at most 100 characters'
  }

  if (symbol !== undefined || !partial) {
    if (typeof symbol !== 'string' || !symbol.trim()) errors.symbol = 'Symbol is required'
    else if (symbol.trim().length > 3) errors.symbol = 'Symbol must be at most 3 characters'
  }

  if (sortOrder !== undefined && !Number.isInteger(sortOrder)) {
    errors.sortOrder = 'sortOrder must be an integer'
  }

  if (partial && !FIELDS.some((f) => input[f] !== undefined)) {
    errors.fields = `Provide at least one of: ${FIELDS.join(', ')}`
  }

  return errors
}

export const validateSkillPartial = (input) => validateSkill(input, { partial: true })
