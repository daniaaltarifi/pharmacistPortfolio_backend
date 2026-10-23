import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import { User } from '../models/index.js'
import { AppError } from '../utils/AppError.js'

export async function login(email, password) {
  const user = await User.scope('withPassword').findOne({ where: { email: email.trim().toLowerCase() } })

  // Same error for "no such user" and "wrong password" so attackers can't probe which emails exist.
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    throw new AppError('Invalid email or password', 401)
  }

  const token = jwt.sign({ sub: user.id, role: user.role, ver: user.tokenVersion }, env.jwt.secret, {
    expiresIn: env.jwt.expiresIn,
  })
  return { token, user: { id: user.id, email: user.email, role: user.role } }
}

export function verifyToken(token) {
  return jwt.verify(token, env.jwt.secret)
}

// Ends every session for this user: tokens carrying the old version are rejected by `authenticate`.
export async function logout(userId) {
  await User.increment('tokenVersion', { where: { id: userId } })
}
