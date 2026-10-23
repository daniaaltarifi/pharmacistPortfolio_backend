import * as membershipService from '../services/membership.service.js'

export async function list(req, res) {
  const memberships = await membershipService.listMemberships()
  res.json({ data: memberships })
}

export async function getById(req, res) {
  const membership = await membershipService.getMembership(req.params.id)
  res.json({ data: membership })
}

export async function create(req, res) {
  const membership = await membershipService.createMembership(req.body)
  res.status(201).json({ data: membership })
}

export async function update(req, res) {
  const membership = await membershipService.updateMembership(req.params.id, req.body)
  res.json({ data: membership })
}

export async function remove(req, res) {
  await membershipService.deleteMembership(req.params.id)
  res.status(204).end()
}
