import * as reportService from '../services/report.service.js'

export async function list(req, res) {
  const reports = await reportService.listReports()
  res.json({ data: reports })
}

export async function getById(req, res) {
  const report = await reportService.getReport(req.params.id)
  res.json({ data: report })
}

export async function create(req, res) {
  const report = await reportService.createReport(req.body)
  res.status(201).json({ data: report })
}

export async function update(req, res) {
  const report = await reportService.updateReport(req.params.id, req.body)
  res.json({ data: report })
}

export async function remove(req, res) {
  await reportService.deleteReport(req.params.id)
  res.status(204).end()
}
