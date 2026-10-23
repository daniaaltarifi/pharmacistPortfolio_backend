// Adds users.token_version, used by POST /api/auth/logout to end every session at once.
// Safe to run repeatedly: it only adds the column if it is missing and never touches other tables.
//   npm run db:add-token-version
import { sequelize } from '../config/database.js'

try {
  await sequelize.authenticate()
  await sequelize.query('ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "token_version" INTEGER NOT NULL DEFAULT 0')
  const [[{ count }]] = await sequelize.query('SELECT COUNT(*)::int AS count FROM "users"')
  console.log(`✅ users.token_version is in place (${count} user${count === 1 ? '' : 's'}, existing sessions stay valid)`)
} catch (err) {
  console.error('❌ Migration failed:', err.message)
  process.exitCode = 1
} finally {
  await sequelize.close()
}
