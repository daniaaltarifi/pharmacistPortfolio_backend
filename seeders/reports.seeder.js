import { Report } from '../models/index.js'

// MOCK data for development — replace with the real reports (or delete them via the API).
const reports = [
  {
    publishedAt: '2026-08-12',
    title: 'MENA Regulatory Outlook 2026',
    description:
      'A review of the regulatory changes expected across GCC and Levant authorities this year, covering registration timelines, reliance pathways and pricing reforms.\n\nThe report highlights where early engagement with regulators can shorten time-to-patient and reduce compliance costs.',
    imageUrl: '/images/v2/research.png',
  },
  {
    publishedAt: '2026-04-03',
    title: 'Tender Performance Benchmark',
    description:
      'Benchmarking of government and institutional tender outcomes across the region, with recommendations on dossier preparation, pricing strategy and penalty reduction.',
    imageUrl: '/images/v2/boardroom.png',
  },
]

// Only seeds an empty table, so it is safe to re-run.
export async function seedReports() {
  if (await Report.count()) return console.log('• reports: already has data, skipped')
  await Report.bulkCreate(reports)
  console.log(`• reports: inserted ${reports.length} rows (mock data)`)
}
