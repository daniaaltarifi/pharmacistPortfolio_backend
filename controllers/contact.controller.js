import * as contactService from '../services/contact.service.js'

export async function submitContact(req, res) {
  const { id } = await contactService.createMessage(req.body)
  res.status(201).json({ ok: true, id })
}

export async function list(req, res) {
  const messages = await contactService.listMessages()
  res.json({ data: messages })
}

export async function remove(req, res) {
  await contactService.deleteMessage(req.params.id)
  res.status(204).end()
}

export async function autoReply(req, res) {
  const reply = await contactService.sendAutoReply(req.params.id)
  res.status(201).json({ data: reply })
}

export async function customReply(req, res) {
  const reply = await contactService.sendCustomReply(req.params.id, req.body)
  res.status(201).json({ data: reply })
}
