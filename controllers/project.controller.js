import * as projectService from '../services/project.service.js'

export async function list(req, res) {
  const projects = await projectService.listProjects()
  res.json({ data: projects })
}

export async function getById(req, res) {
  const project = await projectService.getProject(req.params.id)
  res.json({ data: project })
}

export async function create(req, res) {
  const project = await projectService.createProject(req.body)
  res.status(201).json({ data: project })
}

export async function update(req, res) {
  const project = await projectService.updateProject(req.params.id, req.body)
  res.json({ data: project })
}

export async function remove(req, res) {
  await projectService.deleteProject(req.params.id)
  res.status(204).end()
}
