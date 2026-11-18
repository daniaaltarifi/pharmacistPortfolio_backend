// Adds trainings.image_url (optional photo for each training card).
// Also removes trainings.description, which was added by mistake: the card text is the existing provider.
// Safe to run repeatedly: it only changes what is still needed and never touches other tables.
//   npm run db:add-training-image
import { sequelize } from '../config/database.js'

try {
  await sequelize.authenticate()
  await sequelize.query('ALTER TABLE "trainings" ADD COLUMN IF NOT EXISTS "image_url" VARCHAR(500)')
  await sequelize.query('ALTER TABLE "trainings" DROP COLUMN IF EXISTS "description"')
  const [[{ count }]] = await sequelize.query('SELECT COUNT(*)::int AS count FROM "trainings"')
  console.log(`✅ trainings.image_url is in place, trainings.description removed (${count} training${count === 1 ? '' : 's'})`)
} catch (err) {
  console.error('❌ Migration failed:', err.message)
  process.exitCode = 1
} finally {
  await sequelize.close()
}
