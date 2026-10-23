import { Certification } from '../models/index.js'

// MOCK data for development — replace with the real certifications (or delete them via the API).
const certifications = [
  {
    title: 'Regulatory Affairs Certification (RAC-Drugs)',
    description:
      'Professional credential covering the full pharmaceutical product lifecycle: registration strategy, dossier preparation, post-approval changes and global regulatory compliance.',
    year: 2018,
    institution: 'Regulatory Affairs Professionals Society (RAPS)',
    imageUrl: '/images/v2/research.png',
  },
  {
    title: 'Certified Pharmaceutical GMP Professional (CPGP)',
    description:
      'Certification in current Good Manufacturing Practice, quality systems, validation and inspection readiness for pharmaceutical manufacturing.',
    year: 2015,
    institution: 'American Society for Quality (ASQ)',
    imageUrl: '/images/v2/capsules.png',
  },
]

// Only seeds an empty table, so it is safe to re-run.
export async function seedCertifications() {
  if (await Certification.count()) return console.log('• certifications: already has data, skipped')
  await Certification.bulkCreate(certifications)
  console.log(`• certifications: inserted ${certifications.length} rows (mock data)`)
}
