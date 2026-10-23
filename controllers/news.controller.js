import * as newsService from '../services/news.service.js'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function list(req, res) {
  const { categoryId } = req.query
  // Ignore a malformed filter instead of letting it reach the DB.
  const news = await newsService.listNews({ categoryId: UUID_RE.test(categoryId ?? '') ? categoryId : undefined })
  res.json({ data: news })
}

export async function getById(req, res) {
  const news = await newsService.getNews(req.params.id)
  res.json({ data: news })
}

export async function create(req, res) {
  const news = await newsService.createNews(req.body)
  res.status(201).json({ data: news })
}

export async function update(req, res) {
  const news = await newsService.updateNews(req.params.id, req.body)
  res.json({ data: news })
}

export async function remove(req, res) {
  await newsService.deleteNews(req.params.id)
  res.status(204).end()
}
