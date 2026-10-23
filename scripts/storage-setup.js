// Creates (or updates) the public Supabase Storage bucket used for uploaded images.
//   npm run storage:setup
import { ensureBucket } from '../services/storage.service.js'
//  Allow Types : JPEG, PNG, WebP, GIF
try {
  const { bucket, created } = await ensureBucket()
  console.log(`✅ Storage bucket "${bucket}" ${created ? 'created' : 'already exists (settings updated)'}`)
  console.log('   public: yes · max file size: 5 MB · types: JPEG, PNG, WebP, GIF')
} catch (err) {
  console.error('❌ Storage setup failed:', err.message)
  process.exitCode = 1
}
