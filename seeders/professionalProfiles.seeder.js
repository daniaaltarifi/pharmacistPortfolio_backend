import { sequelize, ProfessionalProfile, ProfilePoint } from '../models/index.js'

// Copied from portfolio-v2-react/src/lib/portfolio-data.js (`professionalProfile`).
const profiles = [
  {
    startYear: 2017,
    endYear: null,
    role: 'Chief Executive Officer',
    org: 'Meridian Health Pharmaceuticals',
    place: 'Dubai, UAE',
    summary:
      'Lead a vertically integrated pharmaceutical group spanning manufacturing, distribution, and a 140-branch retail pharmacy network.',
    points: [
      'Grew annual revenue from $180M to $610M through organic expansion and two strategic acquisitions.',
      'Steered the organisation through COVID-19 with zero critical-medicine stock-outs across all markets.',
      'Established the group’s first GMP-certified sterile injectables facility.',
    ],
  },
  {
    startYear: 2012,
    endYear: 2017,
    role: 'Chief Operating Officer',
    org: 'Gulf Pharma Holdings',
    place: 'Abu Dhabi, UAE',
    summary:
      'Directed end-to-end operations for manufacturing, supply chain, quality assurance and regulatory affairs.',
    points: [
      'Reduced batch release cycle time by 38% through a digital quality management system.',
      'Secured 46 new product registrations across six GCC regulatory authorities.',
    ],
  },
  {
    startYear: 2007,
    endYear: 2012,
    role: 'Director of Pharmacy Services',
    org: 'Al Noor Hospital Group',
    place: 'Abu Dhabi, UAE',
    summary:
      'Oversaw clinical, inpatient and outpatient pharmacy services across four tertiary-care hospitals.',
    points: [
      'Launched an antimicrobial stewardship programme that cut broad-spectrum antibiotic use by 27%.',
      'Achieved JCI accreditation for medication management across all sites.',
    ],
  },
  {
    startYear: 2003,
    endYear: 2007,
    role: 'Clinical Pharmacist, Critical Care',
    org: 'Cleveland Clinic',
    place: 'Cleveland, USA',
    summary:
      'Provided pharmacotherapy consultation to ICU teams and led protocol development for high-alert medications.',
    points: ['Co-authored institutional guidelines for sedation and anticoagulation in critically ill patients.'],
  },
]

// Only seeds an empty table, so it is safe to re-run. All-or-nothing via a transaction.
export async function seedProfessionalProfiles() {
  if (await ProfessionalProfile.count()) return console.log('• professional_profiles: already has data, skipped')

  await sequelize.transaction(async (transaction) => {
    for (const [i, { points, ...fields }] of profiles.entries()) {
      const profile = await ProfessionalProfile.create({ ...fields, sortOrder: i + 1 }, { transaction })
      await ProfilePoint.bulkCreate(
        points.map((text, j) => ({ profileId: profile.id, text, sortOrder: j + 1 })),
        { transaction },
      )
    }
  })

  const pointCount = profiles.reduce((n, p) => n + p.points.length, 0)
  console.log(`• professional_profiles: inserted ${profiles.length} rows (+ ${pointCount} profile_points)`)
}
