import { Report } from '../models/index.js'
import { AppError } from '../utils/AppError.js'

// Whitelist: only these fields can be written from a request body.
function pickFields({ publishedAt, title, description, imageUrl }) {
  const fields = {}
  if (publishedAt !== undefined) fields.publishedAt = publishedAt
  if (title !== undefined) fields.title = title.trim()
  if (description !== undefined) fields.description = description.trim()
  if (imageUrl !== undefined) fields.imageUrl = imageUrl
  return fields
}

// Newest first.
export async function listReports() {
  return Report.findAll({
    order: [
      ['publishedAt', 'DESC'],
      ['createdAt', 'DESC'],
    ],
  })
}

export async function getReport(id) {
  const report = await Report.findByPk(id)
  if (!report) throw new AppError('Report not found', 404)
  return report
}

export async function createReport(input) {
  return Report.create(pickFields(input))
}

export async function updateReport(id, input) {
  const report = await getReport(id)
  return report.update(pickFields(input))
}

export async function deleteReport(id) {
  const deleted = await Report.destroy({ where: { id } })
  if (!deleted) throw new AppError('Report not found', 404)
}
