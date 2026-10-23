import * as profileService from '../services/professionalProfile.service.js'

export async function list(req, res) {
  const profiles = await profileService.listProfiles()
  res.json({ data: profiles })
}

export async function getById(req, res) {
  const profile = await profileService.getProfile(req.params.id)
  res.json({ data: profile })
}

export async function create(req, res) {
  const profile = await profileService.createProfile(req.body)
  res.status(201).json({ data: profile })
}

export async function update(req, res) {
  const profile = await profileService.updateProfile(req.params.id, req.body)
  res.json({ data: profile })
}

export async function remove(req, res) {
  await profileService.deleteProfile(req.params.id)
  res.status(204).end()
}
