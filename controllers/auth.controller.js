import * as authService from '../services/auth.service.js'

export async function login(req, res) {
  const result = await authService.login(req.body.email, req.body.password)
  res.json({ data: result })
}

export function me(req, res) {
  res.json({ data: req.user })
}

export async function logout(req, res) {
  await authService.logout(req.user.id)
  res.status(204).end()
}
