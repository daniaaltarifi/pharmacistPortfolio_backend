import { Skill, Training } from '../models/index.js'

// Copied from portfolio-v2-react/src/lib/portfolio-data.js (`trainings`).
const trainings = [
  { title: 'Advanced Management Program', provider: 'Harvard Business School', year: 2018 },
  { title: 'Board Directors Certification', provider: 'INSEAD', year: 2020 },
  { title: 'Lean Six Sigma Black Belt', provider: 'ASQ', year: 2013 },
  { title: 'GMP Lead Auditor', provider: 'BSI Group', year: 2011 },
  { title: 'Board Certified Pharmacotherapy Specialist', provider: 'BPS', year: 2005 },
]

// Copied from portfolio-v2-react/src/lib/v2-data.js (`skillElements`) — the list the page actually shows.
const skills = [
  { symbol: 'Es', name: 'Executive Strategy' },
  { symbol: 'Ma', name: 'Mergers & Acquisitions' },
  { symbol: 'Ra', name: 'Regulatory Affairs' },
  { symbol: 'Gm', name: 'GMP / GDP Compliance' },
  { symbol: 'Pe', name: 'Pharmacoeconomics' },
  { symbol: 'Sc', name: 'Supply Chain Resilience' },
  { symbol: 'Cg', name: 'Clinical Governance' },
  { symbol: 'Pl', name: 'P&L Management' },
  { symbol: 'Dh', name: 'Digital Health' },
  { symbol: 'Ps', name: 'Public Speaking' },
  { symbol: 'Cm', name: 'Change Management' },
]

// Only seeds empty tables, so it is safe to re-run.
export async function seedTrainings() {
  if (await Training.count()) return console.log('• trainings: already has data, skipped')
  await Training.bulkCreate(trainings)
  console.log(`• trainings: inserted ${trainings.length} rows`)
}

export async function seedSkills() {
  if (await Skill.count()) return console.log('• skills: already has data, skipped')
  await Skill.bulkCreate(skills.map((s, i) => ({ ...s, sortOrder: i + 1 })))
  console.log(`• skills: inserted ${skills.length} rows`)
}
