import { Op, fn, col, where } from 'sequelize'
import { Skill } from '../models/index.js'
import { AppError } from '../utils/AppError.js'

function pickFields({ name, symbol, sortOrder }) {
  const fields = {}
  if (name !== undefined) fields.name = name.trim()
  if (symbol !== undefined) fields.symbol = symbol.trim()
  if (sortOrder !== undefined) fields.sortOrder = sortOrder
  return fields
}

// Case-insensitive duplicate check on name and symbol, so the API returns a clear 409 instead of a DB error.
async function assertUnique({ name, symbol }, exceptId) {
  const notSelf = exceptId ? { id: { [Op.ne]: exceptId } } : {}

  for (const [field, value] of [['name', name], ['symbol', symbol]]) {
    if (value === undefined) continue
    const existing = await Skill.findOne({
      where: { [Op.and]: [where(fn('lower', col(field)), value.toLowerCase()), notSelf] },
    })
    if (existing) throw new AppError(`A skill with ${field} "${existing[field]}" already exists`, 409)
  }
}

export async function listSkills() {
  return Skill.findAll({
    order: [
      ['sortOrder', 'ASC'],
      ['createdAt', 'ASC'],
    ],
  })
}

export async function getSkill(id) {
  const skill = await Skill.findByPk(id)
  if (!skill) throw new AppError('Skill not found', 404)
  return skill
}

export async function createSkill(input) {
  const fields = pickFields(input)
  await assertUnique(fields)

  // Without an explicit sortOrder, append to the end of the table.
  if (fields.sortOrder === undefined) {
    fields.sortOrder = ((await Skill.max('sortOrder')) ?? 0) + 1
  }

  return Skill.create(fields)
}

export async function updateSkill(id, input) {
  const skill = await getSkill(id)
  const fields = pickFields(input)
  await assertUnique(fields, id)
  return skill.update(fields)
}

export async function deleteSkill(id) {
  const deleted = await Skill.destroy({ where: { id } })
  if (!deleted) throw new AppError('Skill not found', 404)
}
