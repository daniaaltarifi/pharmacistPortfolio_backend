import { Project } from '../models/index.js'
import { AppError } from '../utils/AppError.js'

// Whitelist: only these fields can be written from a request body.
function pickFields({ title, description, highlights, imageUrl }) {
  const fields = {}
  if (title !== undefined) fields.title = title.trim()
  if (description !== undefined) fields.description = description.trim()
  if (highlights !== undefined) fields.highlights = highlights.map((h) => h.trim())
  if (imageUrl !== undefined) fields.imageUrl = imageUrl
  return fields
}

// In the order they were added.
export async function listProjects() {
  return Project.findAll({ order: [['createdAt', 'ASC']] })
}

export async function getProject(id) {
  const project = await Project.findByPk(id)
  if (!project) throw new AppError('Project not found', 404)
  return project
}

export async function createProject(input) {
  return Project.create(pickFields(input))
}

// Sending `highlights` replaces the whole list.
export async function updateProject(id, input) {
  const project = await getProject(id)
  return project.update(pickFields(input))
}

export async function deleteProject(id) {
  const deleted = await Project.destroy({ where: { id } })
  if (!deleted) throw new AppError('Project not found', 404)
}
