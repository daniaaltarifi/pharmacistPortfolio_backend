import * as experienceService from '../services/experience.service.js'

export async function list(req, res) {
  const experiences = await experienceService.listExperiences()
  res.json({ data: experiences })
}

export async function create(req, res) {
  const experience = await experienceService.createExperience(req.body)
  res.status(201).json({ data: experience })
}

export async function update(req, res) {
  const experience = await experienceService.updateExperience(req.params.id, req.body)
  res.json({ data: experience })
}

export async function remove(req, res) {
  await experienceService.deleteExperience(req.params.id)
  res.status(204).end()
}
