import nodemailer from 'nodemailer'
import { env } from './env.js'

const { mail } = env

export const isMailConfigured =
  mail.transport === 'log' || Boolean(mail.host && mail.user && mail.pass && mail.from)

function createTransport() {
  if (mail.transport === 'log') {
    // Builds the email but doesn't send it; the service logs it instead.
    return nodemailer.createTransport({ jsonTransport: true })
  }
  if (!isMailConfigured) return null
  return nodemailer.createTransport({
    host: mail.host,
    port: mail.port,
    secure: mail.secure,
    auth: { user: mail.user, pass: mail.pass },
  })
}

export const transporter = createTransport()
