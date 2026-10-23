import { Certification } from '../models/index.js'
import { AppError } from '../utils/AppError.js'

// Whitelist: only these fields can be written from a request body.
function pickFields({ title, description, year, institution, imageUrl }) {
  const fields = {}
  if (title !== undefined) fields.title = title.trim()
  if (description !== undefined) fields.description = description.trim()
  if (year !== undefined) fields.year = year
  if (institution !== undefined) fields.institution = institution.trim()
  if (imageUrl !== undefined) fields.imageUrl = imageUrl
  return fields
}

// Newest first.
export async function listCertifications() {
  return Certification.findAll({
    order: [
      ['year', 'DESC'],
      ['createdAt', 'DESC'],
    ],
  })
}

export async function getCertification(id) {
  const certification = await Certification.findByPk(id)
  if (!certification) throw new AppError('Certification not found', 404)
  return certification
}

export async function createCertification(input) {
  return Certification.create(pickFields(input))
}

export async function updateCertification(id, input) {
  const certification = await getCertification(id)
  return certification.update(pickFields(input))
}

export async function deleteCertification(id) {
  const deleted = await Certification.destroy({ where: { id } })
  if (!deleted) throw new AppError('Certification not found', 404)
}
