import { Experience } from '../models/index.js'
import { AppError } from '../utils/AppError.js'

// Whitelist: only these fields can be written from a request body.
function pickFields({ title, body, sortOrder }) {
  const fields = {}
  if (title !== undefined) fields.title = title.trim()
  if (body !== undefined) fields.body = body.trim()
  if (sortOrder !== undefined) fields.sortOrder = sortOrder
  return fields
}

export async function listExperiences() {
  return Experience.findAll({
    order: [
      ['sortOrder', 'ASC'],
      ['createdAt', 'ASC'],
    ],
  })
}

export async function createExperience(input) {
  const fields = pickFields(input)

  // Without an explicit sortOrder, append to the end of the list.
  if (fields.sortOrder === undefined) {
    fields.sortOrder = ((await Experience.max('sortOrder')) ?? 0) + 1
  }

  return Experience.create(fields)
}

export async function updateExperience(id, input) {
  const experience = await Experience.findByPk(id)
  if (!experience) throw new AppError('Experience not found', 404)
  return experience.update(pickFields(input))
}

export async function deleteExperience(id) {
  const deleted = await Experience.destroy({ where: { id } })
  if (!deleted) throw new AppError('Experience not found', 404)
}
