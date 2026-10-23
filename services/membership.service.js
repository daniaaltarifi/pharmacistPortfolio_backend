import { Membership } from '../models/index.js'
import { AppError } from '../utils/AppError.js'

// Whitelist: only these fields can be written from a request body.
function pickFields({ org, role, sector, period, sortOrder }) {
  const fields = {}
  if (org !== undefined) fields.org = org.trim()
  if (role !== undefined) fields.role = role.trim()
  if (sector !== undefined) fields.sector = sector
  if (period !== undefined) fields.period = period.trim()
  if (sortOrder !== undefined) fields.sortOrder = sortOrder
  return fields
}

export async function listMemberships() {
  return Membership.findAll({
    order: [
      ['sortOrder', 'ASC'],
      ['createdAt', 'ASC'],
    ],
  })
}

export async function getMembership(id) {
  const membership = await Membership.findByPk(id)
  if (!membership) throw new AppError('Membership not found', 404)
  return membership
}

export async function createMembership(input) {
  const fields = pickFields(input)

  // Without an explicit sortOrder, append to the end of the list.
  if (fields.sortOrder === undefined) {
    fields.sortOrder = ((await Membership.max('sortOrder')) ?? 0) + 1
  }

  return Membership.create(fields)
}

export async function updateMembership(id, input) {
  const membership = await getMembership(id)
  return membership.update(pickFields(input))
}

export async function deleteMembership(id) {
  const deleted = await Membership.destroy({ where: { id } })
  if (!deleted) throw new AppError('Membership not found', 404)
}
