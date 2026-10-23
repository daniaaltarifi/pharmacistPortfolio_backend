import { Training } from '../models/index.js'
import { AppError } from '../utils/AppError.js'

// Whitelist: only these fields can be written from a request body.
function pickFields({ title, provider, year }) {
  const fields = {}
  if (title !== undefined) fields.title = title.trim()
  if (provider !== undefined) fields.provider = provider.trim()
  if (year !== undefined) fields.year = year
  return fields
}

// Newest first.
export async function listTrainings() {
  return Training.findAll({
    order: [
      ['year', 'DESC'],
      ['createdAt', 'DESC'],
    ],
  })
}

export async function getTraining(id) {
  const training = await Training.findByPk(id)
  if (!training) throw new AppError('Training not found', 404)
  return training
}

export async function createTraining(input) {
  return Training.create(pickFields(input))
}

export async function updateTraining(id, input) {
  const training = await getTraining(id)
  return training.update(pickFields(input))
}

export async function deleteTraining(id) {
  const deleted = await Training.destroy({ where: { id } })
  if (!deleted) throw new AppError('Training not found', 404)
}
