// Creates the tables defined in /models, then prints what is in the database.
//   npm run db:sync            -> create missing tables (safe, never drops data)
//   npm run db:sync -- --alter -> also update existing tables to match the models
//   npm run db:sync -- --force -> DROP and recreate every table (deletes all data!)
import { sequelize } from '../models/index.js'

const alter = process.argv.includes('--alter')
const force = process.argv.includes('--force')

try {
  await sequelize.authenticate()
  console.log('✅ Database connected')

  await sequelize.sync({ alter, force })
  console.log(`✅ Models synced${force ? ' (force: tables recreated)' : alter ? ' (alter)' : ''}\n`)

  const qi = sequelize.getQueryInterface()
  for (const model of Object.values(sequelize.models)) {
    const table = model.getTableName()

    // Tables in Supabase's public schema are reachable through its Data API; RLS with no policies blocks that,
    // so only this server (connecting as the postgres user) can read/write them.
    await sequelize.query(`ALTER TABLE "${table}" ENABLE ROW LEVEL SECURITY`)

    const columns = await qi.describeTable(table)
    const rows = await model.count()
    console.log(`📋 ${table} (${rows} rows)`)
    console.table(
      Object.entries(columns).map(([name, c]) => ({
        column: name,
        type: c.type,
        nullable: c.allowNull,
        default: c.defaultValue ?? '',
        primaryKey: c.primaryKey,
      })),
    )
  }
} catch (err) {
  console.error('❌ Sync failed:', err.message)
  process.exitCode = 1
} finally {
  await sequelize.close()
}
