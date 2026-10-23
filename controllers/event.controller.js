import * as eventService from '../services/event.service.js'

export async function list(req, res) {
  const events = await eventService.listEvents()
  res.json({ data: events })
}

export async function getById(req, res) {
  const event = await eventService.getEvent(req.params.id)
  res.json({ data: event })
}

export async function create(req, res) {
  const event = await eventService.createEvent(req.body)
  res.status(201).json({ data: event })
}

export async function update(req, res) {
  const event = await eventService.updateEvent(req.params.id, req.body)
  res.json({ data: event })
}

export async function remove(req, res) {
  await eventService.deleteEvent(req.params.id)
  res.status(204).end()
}
