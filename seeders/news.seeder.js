import { sequelize, News, NewsCategory } from '../models/index.js'

// Copied from portfolio-v2-react/src/lib/v2-data.js (`newsItems`).
const categories = ['Keynote', 'Company', 'Academia', 'Patient Care', 'Insight']

const news = [
  {
    category: 'Keynote',
    publishedAt: '2026-09-18',
    title: 'Keynote at the FIP World Congress: regulation as a growth engine',
    description:
      'Dr. Hassan argued that early, proactive engagement with regulators shortens time-to-patient and lowers the cost of compliance across MENA markets.',
    imageUrl: '/images/v2/boardroom.png',
  },
  {
    category: 'Company',
    publishedAt: '2026-07-02',
    title: 'Sterile injectables plant passes its third consecutive GMP inspection',
    description: 'The facility now supplies 40% of the region’s oncology injectables with zero critical findings.',
    imageUrl: '/images/v2/capsules.png',
  },
  {
    category: 'Academia',
    publishedAt: '2026-05-21',
    title: 'Regulatory Affairs course at JUST welcomes its largest cohort',
    description:
      'Fifth-year pharmacy students begin the 3-credit-hour programme on eCTD, bioequivalence and lifecycle strategy.',
    imageUrl: '/images/v2/research.png',
  },
  {
    category: 'Patient Care',
    publishedAt: '2026-03-10',
    title: 'Pharmacist-led clinics pass 2 million consultations a year',
    description: 'Chronic disease clinics across 140 branches continue to expand access to medication reviews.',
    imageUrl: '/images/v2/pharmacy-night.png',
  },
  {
    category: 'Insight',
    publishedAt: '2026-01-28',
    title: 'New report maps external reference pricing across MENA',
    description: 'A regional pricing matrix shows how reference baskets shape launch sequencing and reimbursement.',
    imageUrl: '/images/v2/molecule.png',
  },
]

// Only seeds empty tables, so it is safe to re-run. All-or-nothing via a transaction.
export async function seedNews() {
  if (await NewsCategory.count()) return console.log('• news_categories / news: already has data, skipped')

  await sequelize.transaction(async (transaction) => {
    const created = await NewsCategory.bulkCreate(
      categories.map((name) => ({ name })),
      { transaction, returning: true },
    )
    const idByName = Object.fromEntries(created.map((c) => [c.name, c.id]))

    await News.bulkCreate(
      news.map(({ category, ...item }) => ({ ...item, categoryId: idByName[category] })),
      { transaction },
    )
  })

  console.log(`• news_categories: inserted ${categories.length} rows`)
  console.log(`• news: inserted ${news.length} rows`)
}
