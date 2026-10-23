import { News, NewsCategory } from '../models/index.js'
import { AppError } from '../utils/AppError.js'

// Every news response carries its category as { id, name }.
const withCategory = {
  include: [{ model: NewsCategory, as: 'category', attributes: ['id', 'name'] }],
}

// Whitelist: only these fields can be written from a request body.
function pickFields({ categoryId, publishedAt, title, description, imageUrl, link }) {
  const fields = {}
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

// Newest first. Optional ?categoryId= filter.
export async function listNews({ categoryId } = {}) {
  return News.findAll({
    ...withCategory,
    where: categoryId ? { categoryId } : undefined,
    order: [
      ['publishedAt', 'DESC'],
      ['createdAt', 'DESC'],
    ],
  })
}

export async function getNews(id) {
  const news = await News.findByPk(id, withCategory)
  if (!news) throw new AppError('News not found', 404)
  return news
}

export async function createNews(input) {
  const fields = pickFields(input)
  await assertCategoryExists(fields.categoryId)
  const news = await News.create(fields)
  return getNews(news.id)
}

export async function updateNews(id, input) {
  const news = await getNews(id)
  const fields = pickFields(input)
  if (fields.categoryId !== undefined) await assertCategoryExists(fields.categoryId)
  await news.update(fields)
  return getNews(id)
}

export async function deleteNews(id) {
  const deleted = await News.destroy({ where: { id } })
  if (!deleted) throw new AppError('News not found', 404)
}
