import { GalleryImage } from '../models/index.js'

// MOCK data for development: images already in portfolio-v2-react/public/images. Replace them from the dashboard.
const images = [
  '/images/v2/boardroom.png',
  '/images/v2/research.png',
  '/images/v2/capsules.png',
  '/images/v2/pharmacy-night.png',
  '/images/v2/molecule.png',
  '/images/v2/portrait-studio.png',
  '/images/laboratory.png',
]

// Only seeds an empty table, so it is safe to re-run.
// Inserted one by one so created_at follows the list order.
export async function seedGallery() {
  if (await GalleryImage.count()) return console.log('• gallery_images: already has data, skipped')
  for (const imageUrl of images) await GalleryImage.create({ imageUrl })
  console.log(`• gallery_images: inserted ${images.length} rows (mock data)`)
}
