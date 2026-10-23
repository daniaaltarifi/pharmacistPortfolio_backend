import { Experience } from '../models/index.js'

// Copied from portfolio-v2-react/src/lib/portfolio-data.js (`experiences`).
const experiences = [
  { title: 'Strategic Leadership', body: 'Board-level strategy, M&A integration, and long-range portfolio planning for multi-market pharmaceutical businesses.' },
  { title: 'Regulatory & Quality', body: 'GMP, GDP and GPP compliance; dossier strategy with FDA, EMA, MOHAP and SFDA; inspection readiness.' },
  { title: 'Clinical Pharmacy', body: 'Evidence-based pharmacotherapy, medication safety systems, and pharmacy practice transformation.' },
  { title: 'Healthcare Innovation', body: 'Digital pharmacy, e-prescribing integration, telepharmacy and data-led patient adherence programmes.' },
  { title: 'Clinical Pharmacy', body: 'Evidence-based pharmacotherapy, medication safety systems, and pharmacy practice transformation.' },
  { title: 'Healthcare Innovation', body: 'Digital pharmacy, e-prescribing integration, telepharmacy and data-led patient adherence programmes.' },
  { title: 'Clinical Pharmacy', body: 'Evidence-based pharmacotherapy, medication safety systems, and pharmacy practice transformation.' },
  { title: 'Healthcare Innovation', body: 'Digital pharmacy, e-prescribing integration, telepharmacy and data-led patient adherence programmes.' },
  { title: 'Clinical Pharmacy', body: 'Evidence-based pharmacotherapy, medication safety systems, and pharmacy practice transformation.' },
  { title: 'Healthcare Innovation', body: 'Digital pharmacy, e-prescribing integration, telepharmacy and data-led patient adherence programmes.' },
]

// Only seeds an empty table, so it is safe to re-run.
export async function seedExperiences() {
  if (await Experience.count()) return console.log('• experiences: already has data, skipped')
  await Experience.bulkCreate(experiences.map((e, i) => ({ ...e, sortOrder: i + 1 })))
  console.log(`• experiences: inserted ${experiences.length} rows`)
}
