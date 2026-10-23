import { Event } from '../models/index.js'
import { AppError } from '../utils/AppError.js'

// Whitelist: only these fields can be written from a request body.
function pickFields({ eventDate, role, title, summary, location, imageUrl, link }) {
  const fields = {}
  if (eventDate !== undefined) fields.eventDate = eventDate
  if (role !== undefined) fields.role = role.trim()
  if (title !== undefined) fields.title = title.trim()
  if (summary !== undefined) fields.summary = summary.trim()
  if (location !== undefined) fields.location = location.trim()
  if (imageUrl !== undefined) fields.imageUrl = imageUrl
  if (link !== undefined) fields.link = link?.trim() || null
  return fields
}

// Newest first.
export async function listEvents() {
  return Event.findAll({
    order: [
      ['eventDate', 'DESC'],
      ['createdAt', 'DESC'],
    ],
  })
}

export async function getEvent(id) {
  const event = await Event.findByPk(id)
  if (!event) throw new AppError('Event not found', 404)
  return event
}

export async function createEvent(input) {
  return Event.create(pickFields(input))
}

export async function updateEvent(id, input) {
  const event = await getEvent(id)
  return event.update(pickFields(input))
}

export async function deleteEvent(id) {
  const deleted = await Event.destroy({ where: { id } })
  if (!deleted) throw new AppError('Event not found', 404)
}
