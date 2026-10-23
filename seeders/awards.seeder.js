import { Award } from '../models/index.js'

// Copied from portfolio-v2-react/src/lib/portfolio-data.js (`awards`).
const awards = [
  {
    year: 2024,
    title: 'Healthcare CEO of the Year',
    issuer: 'Middle East Healthcare Leadership Awards',
    description: 'Recognised for outstanding leadership and strategic vision in the healthcare sector.',
    imageUrl: '/images/laboratory.png',
  },
  { year: 2023, title: 'Top 50 Women in Pharma', issuer: 'PharmaVoice Global' },
  { year: 2021, title: 'Excellence in Pandemic Response', issuer: 'UAE Ministry of Health & Prevention' },
  { year: 2019, title: 'Distinguished Alumni Award', issuer: 'University of Michigan College of Pharmacy' },
  { year: 2016, title: 'Innovation in Pharmacy Practice', issuer: 'FIP World Congress' },
]

// Only seeds an empty table, so it is safe to re-run.
export async function seedAwards() {
  if (await Award.count()) return console.log('• awards: already has data, skipped')
  await Award.bulkCreate(awards)
  console.log(`• awards: inserted ${awards.length} rows`)
}
