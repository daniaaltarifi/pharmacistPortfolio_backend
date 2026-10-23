import bcrypt from 'bcryptjs'
import { User } from '../models/index.js'

// Creates the admin account from ADMIN_EMAIL / ADMIN_PASSWORD (only if it doesn't exist yet).
export async function seedAdmin() {
  const { ADMIN_EMAIL: email, ADMIN_PASSWORD: password } = process.env
  if (!email || !password) return console.log('• users: ADMIN_EMAIL / ADMIN_PASSWORD not set, skipped')
  if (password.length < 8) throw new Error('ADMIN_PASSWORD must be at least 8 characters')

  const [, created] = await User.findOrCreate({
    where: { email: email.trim().toLowerCase() },
    defaults: { email, passwordHash: await bcrypt.hash(password, 12), role: 'admin' },
  })
  console.log(`• users: admin ${email} ${created ? 'created' : 'already exists, skipped'}`)
}
