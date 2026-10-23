import * as categoryService from '../services/newsCategory.service.js'

export async function list(req, res) {
  const categories = await categoryService.listCategories()
  res.json({ data: categories })
}

export async function getById(req, res) {
  const category = await categoryService.getCategory(req.params.id)
  res.json({ data: category })
}

export async function create(req, res) {
  const category = await categoryService.createCategory(req.body)
  res.status(201).json({ data: category })
}

export async function update(req, res) {
  const category = await categoryService.updateCategory(req.params.id, req.body)
  res.json({ data: category })
}

export async function remove(req, res) {
  await categoryService.deleteCategory(req.params.id)
  res.status(204).end()
}
