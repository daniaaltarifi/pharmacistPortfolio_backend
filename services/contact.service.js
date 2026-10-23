import { env } from '../config/env.js'
import { isMailConfigured, transporter } from '../config/mailer.js'
import { ContactMessage, ContactReply } from '../models/index.js'
import { renderAutoReply } from '../templates/autoReply.js'
import { AppError } from '../utils/AppError.js'

// Every message comes with the replies already sent, oldest first.
const withReplies = {
  include: [{ model: ContactReply, as: 'replies', attributes: ['id', 'type', 'subject', 'body', 'createdAt'] }],
}

export async function createMessage({ name, email, message }) {
  return ContactMessage.create({ name: name.trim(), email: email.trim(), message: message.trim() })
}

// Newest first.
export async function listMessages() {
  return ContactMessage.findAll({
    ...withReplies,
    order: [
      ['createdAt', 'DESC'],
      [{ model: ContactReply, as: 'replies' }, 'createdAt', 'ASC'],
    ],
  })
}

export async function deleteMessage(id) {
  // Its replies are removed by ON DELETE CASCADE.
  const deleted = await ContactMessage.destroy({ where: { id } })
  if (!deleted) throw new AppError('Message not found', 404)
}

async function findMessage(id) {
  const message = await ContactMessage.findByPk(id)
  if (!message) throw new AppError('Message not found', 404)
  return message
}

// Sends the reply, quoting the visitor's original message underneath, then records it.
async function sendReply(message, { type, subject, body }) {
  if (!isMailConfigured) {
    throw new AppError('Email is not configured on the server (set the SMTP_* and MAIL_FROM values in .env)', 503)
  }

  const quoted = message.message
    .split('\n')
    .map((line) => `> ${line}`)
    .join('\n')
  const text = `${body}\n\n---\nOn ${message.createdAt.toUTCString()}, ${message.name} wrote:\n${quoted}\n`

  try {
    const info = await transporter.sendMail({
      from: env.mail.from || 'Portfolio <no-reply@localhost>',
      replyTo: env.mail.replyTo || env.mail.from,
      to: { name: message.name, address: message.email },
      subject,
      text,
    })
    if (env.mail.transport === 'log') console.log('📧 [MAIL_TRANSPORT=log] email not sent:\n' + info.message)
  } catch (err) {
    // Nothing is recorded when sending fails, so the admin can simply try again.
    throw new AppError(`Email could not be sent: ${err.message}`, 502)
  }

  return ContactReply.create({ messageId: message.id, type, subject, body })
}

export async function sendAutoReply(id) {
  const message = await findMessage(id)
  return sendReply(message, { type: 'auto', ...renderAutoReply(message.name) })
}

export async function sendCustomReply(id, { subject, body }) {
  const message = await findMessage(id)
  return sendReply(message, { type: 'custom', subject: subject.trim(), body: body.trim() })
}
