// Centralized, validated environment config. Import from here instead of reading process.env directly.
function required(name) {
  const value = process.env[name]
  if (!value) throw new Error(`Missing required environment variable: ${name}`)
  return value
}

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  clientOrigins: (process.env.CLIENT_ORIGIN || 'http://localhost:5173').split(',').map((o) => o.trim()),
  // Supabase Postgres connection string (Dashboard -> Connect -> Session pooler).
  databaseUrl: required('DATABASE_URL'),
  jwt: {
    secret: required('JWT_SECRET'),
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
  // Supabase Storage for uploaded images. Optional: without it the API runs, only uploads are disabled.
  storage: {
    supabaseUrl: process.env.SUPABASE_URL,
    // Server-only secret key. Never expose it to the frontend.
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    bucket: process.env.SUPABASE_STORAGE_BUCKET || 'images',
  },
  // Outgoing email for replying to contact messages. Optional: without it the API runs, only replies are disabled.
  // MAIL_TRANSPORT=log prints emails to the server console instead of sending them (for local testing).
  mail: {
    transport: process.env.MAIL_TRANSPORT === 'log' ? 'log' : 'smtp',
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    // true for port 465 (SSL); false for 587 (STARTTLS)
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    // e.g. "Dr. Hassan <you@gmail.com>"
    from: process.env.MAIL_FROM,
    // Where the visitor's answers go; defaults to MAIL_FROM.
    replyTo: process.env.MAIL_REPLY_TO,
  },
}
