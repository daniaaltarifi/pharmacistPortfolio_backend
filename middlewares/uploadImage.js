import multer from 'multer'
import { AppError } from '../utils/AppError.js'
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_BYTES } from '../services/storage.service.js'

// Keeps the file in memory (max 5 MB) and passes it on to Supabase Storage; nothing is written to disk.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_IMAGE_BYTES, files: 1 },
  // Quick reject by declared type; the real type is verified from the file bytes in storage.service.
  fileFilter: (req, file, cb) => {
    if (ALLOWED_IMAGE_TYPES.includes(file.mimetype)) return cb(null, true)
    cb(new AppError('Only JPEG, PNG, WebP or GIF images are allowed', 400))
  },
})

// Expects multipart/form-data with the image in a field named "file".
export function uploadSingleImage(req, res, next) {
  upload.single('file')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') return next(new AppError('Image must be at most 5 MB', 413))
      return next(new AppError(`Upload error: ${err.message}`, 400))
    }
    if (err) return next(err)
    if (!req.file) return next(new AppError('Send the image as form-data in a field named "file"', 400))
    next()
  })
}
