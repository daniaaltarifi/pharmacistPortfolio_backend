import { Op, fn, col, where } from 'sequelize'
import { NewsCategory, News } from '../models/index.js'
import { AppError } from '../utils/AppError.js'

// Case-insensitive duplicate check, so the API returns a clear 409 instead of a DB error.
async function assertNameAvailable(name, exceptId) {
  const existing = await NewsCategory.findOne({
    where: {
      [Op.and]: [where(fn('lower', col('name')), name.toLowerCase()), exceptId ? { id: { [Op.ne]: exceptId } } : {}],
    },
  })
  if (existing) throw new AppError(`Category "${existing.name}" already exists`, 409)
}

// Alphabetical.
export async function listCategories() {
  return NewsCategory.findAll({ order: [['name', 'ASC']] })
}

export async function getCategory(id) {
  const category = await NewsCategory.findByPk(id)
  if (!category) throw new AppError('Category not found', 404)
  return category
}

export async function createCategory({ name }) {
  await assertNameAvailable(name.trim())
  return NewsCategory.create({ name: name.trim() })
}

export async function updateCategory(id, { name }) {
  const category = await getCategory(id)
  await assertNameAvailable(name.trim(), id)
  return category.update({ name: name.trim() })
}

export async function deleteCategory(id) {
  const category = await getCategory(id)

  const newsCount = await News.count({ where: { categoryId: id } })
  if (newsCount) {
    throw new AppError(`Category is used by ${newsCount} news item(s); move or delete them first`, 409)
  }

  await category.destroy()
}
