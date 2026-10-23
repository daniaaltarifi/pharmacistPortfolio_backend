import { createClient } from '@supabase/supabase-js'
import { env } from './env.js'

const { supabaseUrl, serviceRoleKey } = env.storage

export const isStorageConfigured = Boolean(supabaseUrl && serviceRoleKey)

// Only used for Storage (the database goes through Sequelize). null when not configured.
export const supabase = isStorageConfigured
  ? createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false, autoRefreshToken: false } })
  : null
