import { sequelize, ProfessionalProfile, ProfilePoint } from '../models/index.js'
import { AppError } from '../utils/AppError.js'

const withPoints = {
  include: [{ model: ProfilePoint, as: 'points', attributes: ['text', 'sortOrder'] }],
  order: [
    ['sortOrder', 'ASC'],
    ['startYear', 'DESC'],
    [{ model: ProfilePoint, as: 'points' }, 'sortOrder', 'ASC'],
  ],
}

// DB shape -> API shape the frontend uses (points as plain strings).
function toDto(profile) {
  const { points, ...rest } = profile.toJSON()
  return { ...rest, points: points.map((p) => p.text) }
}

// Whitelist: only these fields can be written from a request body.
function pickFields({ role, org, place, summary, startYear, endYear, sortOrder }) {
  const fields = {}
  if (role !== undefined) fields.role = role.trim()
  if (org !== undefined) fields.org = org.trim()
  if (place !== undefined) fields.place = place.trim()
  if (summary !== undefined) fields.summary = summary.trim()
  if (startYear !== undefined) fields.startYear = startYear
  if (endYear !== undefined) fields.endYear = endYear
  if (sortOrder !== undefined) fields.sortOrder = sortOrder
  return fields
}

function replacePoints(profileId, points, transaction) {
  return ProfilePoint.bulkCreate(
    points.map((text, i) => ({ profileId, text: text.trim(), sortOrder: i + 1 })),
    { transaction, validate: true },
  )
}

async function findProfile(id, options = {}) {
  const profile = await ProfessionalProfile.findByPk(id, options)
  if (!profile) throw new AppError('Profile not found', 404)
  return profile
}

export async function listProfiles() {
  const profiles = await ProfessionalProfile.findAll(withPoints)
  return profiles.map(toDto)
}

export async function getProfile(id) {
  return toDto(await findProfile(id, withPoints))
}

export async function createProfile(input) {
  const fields = pickFields(input)

  const id = await sequelize.transaction(async (transaction) => {
    // Without an explicit sortOrder, append to the end of the list.
    if (fields.sortOrder === undefined) {
      fields.sortOrder = ((await ProfessionalProfile.max('sortOrder', { transaction })) ?? 0) + 1
    }
    const profile = await ProfessionalProfile.create(fields, { transaction })
    await replacePoints(profile.id, input.points ?? [], transaction)
    return profile.id
  })

  return getProfile(id)
}

// Updates the given fields. If `points` is sent, it replaces the whole list; otherwise points are untouched.
export async function updateProfile(id, input) {
  await sequelize.transaction(async (transaction) => {
    const profile = await findProfile(id, { transaction })
    await profile.update(pickFields(input), { transaction })

    if (input.points !== undefined) {
      await ProfilePoint.destroy({ where: { profileId: id }, transaction })
      await replacePoints(id, input.points, transaction)
    }
  })

  return getProfile(id)
}

export async function deleteProfile(id) {
  // Points are removed by ON DELETE CASCADE.
  const deleted = await ProfessionalProfile.destroy({ where: { id } })
  if (!deleted) throw new AppError('Profile not found', 404)
}
