import * as awardService from '../services/award.service.js'

export async function list(req, res) {
  const awards = await awardService.listAwards()
  res.json({ data: awards })
}

export async function getById(req, res) {
  const award = await awardService.getAward(req.params.id)
  res.json({ data: award })
}

export async function create(req, res) {
  const award = await awardService.createAward(req.body)
  res.status(201).json({ data: award })
}

export async function update(req, res) {
  const award = await awardService.updateAward(req.params.id, req.body)
  res.json({ data: award })
}

export async function remove(req, res) {
  await awardService.deleteAward(req.params.id)
  res.status(204).end()
}
