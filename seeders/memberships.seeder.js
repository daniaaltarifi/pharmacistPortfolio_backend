import { Membership } from '../models/index.js'

// Real memberships (same data as `memberships` in portfolio-v2-react/src/lib/portfolio-data.js).
const memberships = [
  { org: 'Guidepoint Global Advisors', role: 'Registered Member', sector: null, period: 'Till present' },
  { org: 'Zaytoonah University', role: 'Member of the Faculty of Pharmacy Board', sector: 'Private', period: '2022 till now' },
  { org: 'JUST University Pharmaceutical Research Center (PRC)', role: 'Board Member', sector: null, period: '2022 till now' },
  { org: 'Yarmouk University', role: 'Member of the Faculty of Pharmacy Board', sector: 'Governmental', period: '2020-22, 25-26' },
]

// Only seeds an empty table, so it is safe to re-run.
export async function seedMemberships() {
  if (await Membership.count()) return console.log('• memberships: already has data, skipped')
  await Membership.bulkCreate(memberships.map((m, i) => ({ ...m, sortOrder: i + 1 })))
  console.log(`• memberships: inserted ${memberships.length} rows`)
}
