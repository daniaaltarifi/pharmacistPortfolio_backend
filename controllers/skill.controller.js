import * as skillService from '../services/skill.service.js'

export async function list(req, res) {
  const skills = await skillService.listSkills()
  res.json({ data: skills })
}

export async function getById(req, res) {
  const skill = await skillService.getSkill(req.params.id)
  res.json({ data: skill })
}

export async function create(req, res) {
  const skill = await skillService.createSkill(req.body)
  res.status(201).json({ data: skill })
}

export async function update(req, res) {
  const skill = await skillService.updateSkill(req.params.id, req.body)
  res.json({ data: skill })
}

export async function remove(req, res) {
  await skillService.deleteSkill(req.params.id)
  res.status(204).end()
}
