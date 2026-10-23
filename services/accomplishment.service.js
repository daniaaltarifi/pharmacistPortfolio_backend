import { Accomplishment } from '../models/index.js'
import { AppError } from '../utils/AppError.js'

// Whitelist: only these fields can be written from a request body.
function pickFields({ metric, title, organization, body, sortOrder }) {
  const fields = {}
  if (metric !== undefined) fields.metric = metric.trim()
  if (title !== undefined) fields.title = title.trim()
  if (organization !== undefined) fields.organization = organization.trim()
  if (body !== undefined) fields.body = body.trim()
  if (sortOrder !== undefined) fields.sortOrder = sortOrder
  return fields
}

export async function listAccomplishments() {
  return Accomplishment.findAll({
    order: [
      ['sortOrder', 'ASC'],
      ['createdAt', 'ASC'],
    ],
  })
}

export async function getAccomplishment(id) {
  const accomplishment = await Accomplishment.findByPk(id)
  if (!accomplishment) throw new AppError('Accomplishment not found', 404)
  return accomplishment
}

export async function createAccomplishment(input) {
  const fields = pickFields(input)

  // Without an explicit sortOrder, append to the end of the list.
  if (fields.sortOrder === undefined) {
    fields.sortOrder = ((await Accomplishment.max('sortOrder')) ?? 0) + 1
  }

  return Accomplishment.create(fields)
}

export async function updateAccomplishment(id, input) {
  const accomplishment = await getAccomplishment(id)
  return accomplishment.update(pickFields(input))
}

export async function deleteAccomplishment(id) {
  const deleted = await Accomplishment.destroy({ where: { id } })
  if (!deleted) throw new AppError('Accomplishment not found', 404)
}
