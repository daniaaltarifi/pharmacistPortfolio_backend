import crypto from 'node:crypto'
import { env } from '../config/env.js'
import { supabase, isStorageConfigured } from '../config/storage.js'
import { AppError } from '../utils/AppError.js'

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024 // 5 MB

// Detect the real type from the file's first bytes (the client-sent mimetype/extension can't be trusted).
const SIGNATURES = [
  { mime: 'image/jpeg', ext: 'jpg', test: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  { mime: 'image/png', ext: 'png', test: (b) => b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) },
  { mime: 'image/gif', ext: 'gif', test: (b) => b.subarray(0, 4).toString('ascii') === 'GIF8' },
  { mime: 'image/webp', ext: 'webp', test: (b) => b.subarray(0, 4).toString('ascii') === 'RIFF' && b.subarray(8, 12).toString('ascii') === 'WEBP' },
]
export const ALLOWED_IMAGE_TYPES = SIGNATURES.map((s) => s.mime)

function detectImageType(buffer) {
  return SIGNATURES.find((s) => buffer.length >= 12 && s.test(buffer)) ?? null
}

function assertConfigured() {
  if (!isStorageConfigured) {
    throw new AppError('Image storage is not configured (set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY)', 503)
  }
}

// Creates the public bucket if it doesn't exist yet (safe to run repeatedly).
export async function ensureBucket() {
  assertConfigured()
  const { bucket } = env.storage
  const options = { public: true, fileSizeLimit: MAX_IMAGE_BYTES, allowedMimeTypes: ALLOWED_IMAGE_TYPES }

  const { data: existing } = await supabase.storage.getBucket(bucket)
  const { error } = existing
    ? await supabase.storage.updateBucket(bucket, options)
    : await supabase.storage.createBucket(bucket, options)
  if (error) throw new AppError(`Storage bucket setup failed: ${error.message}`, 500)

  return { bucket, created: !existing }
}

// Uploads an image buffer and returns its public URL.
export async function uploadImage(buffer) {
  assertConfigured()

  const type = detectImageType(buffer)
  if (!type) throw new AppError('Only JPEG, PNG, WebP or GIF images are allowed', 400)

  // Random name, grouped by month: 2026/10/<uuid>.webp — uploads never overwrite each other.
  const now = new Date()
  const path = `${now.getUTCFullYear()}/${String(now.getUTCMonth() + 1).padStart(2, '0')}/${crypto.randomUUID()}.${type.ext}`

  const { bucket } = env.storage
  const { error } = await supabase.storage.from(bucket).upload(path, buffer, {
    contentType: type.mime,
    cacheControl: '31536000', // 1 year: the file name never changes, so browsers can cache it forever
    upsert: false,
  })
  if (error) throw new AppError(`Image upload failed: ${error.message}`, 502)

  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return { url: data.publicUrl, path, contentType: type.mime, size: buffer.length }
}

export async function deleteImage(path) {
  assertConfigured()
  const { error } = await supabase.storage.from(env.storage.bucket).remove([path])
  if (error) throw new AppError(`Image delete failed: ${error.message}`, 502)
}
