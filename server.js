import app from './app.js'
import { env } from './config/env.js'
import { checkDbConnection } from './config/database.js'

app.listen(env.port, async () => {
  console.log(`API listening on http://localhost:${env.port} (${env.nodeEnv})`)
  try {
    await checkDbConnection()
    console.log('✅ Database connected successfully (Supabase)')
  } catch (err) {
    console.error(`❌ Database connection failed: ${err.message}`)
  }
})
