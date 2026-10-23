import * as accomplishmentService from '../services/accomplishment.service.js'

export async function list(req, res) {
  const accomplishments = await accomplishmentService.listAccomplishments()
  res.json({ data: accomplishments })
}

export async function getById(req, res) {
  const accomplishment = await accomplishmentService.getAccomplishment(req.params.id)
  res.json({ data: accomplishment })
}

export async function create(req, res) {
  const accomplishment = await accomplishmentService.createAccomplishment(req.body)
  res.status(201).json({ data: accomplishment })
}

export async function update(req, res) {
  const accomplishment = await accomplishmentService.updateAccomplishment(req.params.id, req.body)
  res.json({ data: accomplishment })
}

export async function remove(req, res) {
  await accomplishmentService.deleteAccomplishment(req.params.id)
  res.status(204).end()
}
