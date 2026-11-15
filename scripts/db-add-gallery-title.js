// Adds gallery_images.title, an optional caption for each gallery photo.
// Safe to run repeatedly: it only adds the column if it is missing and never touches other tables.
//   npm run db:add-gallery-title
import { sequelize } from '../config/database.js'

try {
  await sequelize.authenticate()
  await sequelize.query('ALTER TABLE "gallery_images" ADD COLUMN IF NOT EXISTS "title" VARCHAR(200)')
  const [[{ count }]] = await sequelize.query('SELECT COUNT(*)::int AS count FROM "gallery_images"')
  console.log(`✅ gallery_images.title is in place (${count} photo${count === 1 ? '' : 's'}, existing photos have no title yet)`)
} catch (err) {
  console.error('❌ Migration failed:', err.message)
  process.exitCode = 1
} finally {
  await sequelize.close()
}
