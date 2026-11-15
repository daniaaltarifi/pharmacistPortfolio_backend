import { News, NewsCategory } from '../models/index.js'
import { AppError } from '../utils/AppError.js'

// Every news response carries its category as { id, name }.
const withCategory = {
  include: [{ model: NewsCategory, as: 'category', attributes: ['id', 'name'] }],
}

// Whitelist: only these fields can be written from a request body.
function pickFields({ categoryId, publishedAt, title, description, imageUrl, link, status }) {
  const fields = {}
  if (status !== undefined) fields.status = status
  if (categoryId !== undefined) fields.categoryId = categoryId
  if (publishedAt !== undefined) fields.publishedAt = publishedAt
  if (title !== undefined) fields.title = title.trim()
  if (description !== undefined) fields.description = description.trim()
  if (imageUrl !== undefined) fields.imageUrl = imageUrl
  if (link !== undefined) fields.link = link?.trim() || null
  return fields
}

async function assertCategoryExists(categoryId) {
  if (!(await NewsCategory.findByPk(categoryId, { attributes: ['id'] }))) {
    throw new AppError('Invalid submission', 400, { categoryId: 'Category does not exist' })
  }
}

// Newest first. Optional ?categoryId= filter. Drafts are only included for admins.
export async function listNews({ categoryId, includeDrafts = false } = {}) {
  const where = {}
  if (categoryId) where.categoryId = categoryId
  if (!includeDrafts) where.status = 'active'
  return News.findAll({
    ...withCategory,
    where,
    order: [
      ['publishedAt', 'DESC'],
      ['createdAt', 'DESC'],
    ],
  })
}

// A draft looks like it does not exist to the public.
export async function getNews(id, { includeDrafts = false } = {}) {
  const news = await News.findByPk(id, withCategory)
  if (!news || (!includeDrafts && news.status !== 'active')) throw new AppError('News not found', 404)
  return news
}

export async function createNews(input) {
  const fields = pickFields(input)
  await assertCategoryExists(fields.categoryId)
  const news = await News.create(fields)
  return getNews(news.id, { includeDrafts: true })
}

export async function updateNews(id, input) {
  const news = await getNews(id, { includeDrafts: true })
  const fields = pickFields(input)
  if (fields.categoryId !== undefined) await assertCategoryExists(fields.categoryId)
  await news.update(fields)
  return getNews(id, { includeDrafts: true })
}

export async function deleteNews(id) {
  const deleted = await News.destroy({ where: { id }, individualHooks: true }) // runs the image-cleanup hook
  if (!deleted) throw new AppError('News not found', 404)
}
