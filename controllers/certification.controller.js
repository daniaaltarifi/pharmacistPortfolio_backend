import * as certificationService from '../services/certification.service.js'

export async function list(req, res) {
  const certifications = await certificationService.listCertifications()
  res.json({ data: certifications })
}

export async function getById(req, res) {
  const certification = await certificationService.getCertification(req.params.id)
  res.json({ data: certification })
}

export async function create(req, res) {
  const certification = await certificationService.createCertification(req.body)
  res.status(201).json({ data: certification })
}

export async function update(req, res) {
  const certification = await certificationService.updateCertification(req.params.id, req.body)
  res.json({ data: certification })
}

export async function remove(req, res) {
  await certificationService.deleteCertification(req.params.id)
  res.status(204).end()
}
