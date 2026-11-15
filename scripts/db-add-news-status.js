// Adds news.status ("draft" | "active"). Only active news is shown on the public site.
// Existing news becomes "active", so nothing that is live today disappears.
// Safe to run repeatedly: it only adds what is missing and never touches other tables.
//   npm run db:add-news-status
import { sequelize } from '../config/database.js'

try {
  await sequelize.authenticate()
  await sequelize.query(`ALTER TABLE "news" ADD COLUMN IF NOT EXISTS "status" VARCHAR(10) NOT NULL DEFAULT 'active'`)
  await sequelize.query(`
    DO $$ BEGIN
      ALTER TABLE "news" ADD CONSTRAINT "news_status_check" CHECK ("status" IN ('draft', 'active'));
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$`)
  await sequelize.query('CREATE INDEX IF NOT EXISTS "news_status_idx" ON "news" ("status")')
  const [rows] = await sequelize.query('SELECT "status", COUNT(*)::int AS count FROM "news" GROUP BY "status" ORDER BY "status"')
  const summary = rows.map((r) => `${r.count} ${r.status}`).join(', ') || 'no news yet'
  console.log(`✅ news.status is in place (${summary})`)
} catch (err) {
  console.error('❌ Migration failed:', err.message)
  process.exitCode = 1
} finally {
  await sequelize.close()
}
