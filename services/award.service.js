import { Award } from '../models/index.js'
import { AppError } from '../utils/AppError.js'

// Whitelist: only these fields can be written from a request body.
function pickFields({ year, title, issuer, description, imageUrl }) {
  const fields = {}
  if (year !== undefined) fields.year = year
  if (title !== undefined) fields.title = title.trim()
  if (issuer !== undefined) fields.issuer = issuer.trim()
  // Empty text is stored as null so the frontend can simply check `if (award.description)`.
  if (description !== undefined) fields.description = description?.trim() || null
  if (imageUrl !== undefined) fields.imageUrl = imageUrl
  return fields
}

// Newest first.
export async function listAwards() {
  return Award.findAll({
    order: [
      ['year', 'DESC'],
      ['createdAt', 'DESC'],
    ],
  })
}

export async function getAward(id) {
  const award = await Award.findByPk(id)
  if (!award) throw new AppError('Award not found', 404)
  return award
}

export async function createAward(input) {
  return Award.create(pickFields(input))
}

export async function updateAward(id, input) {
  const award = await getAward(id)
  return award.update(pickFields(input))
}

export async function deleteAward(id) {
  const deleted = await Award.destroy({ where: { id } })
  if (!deleted) throw new AppError('Award not found', 404)
}
