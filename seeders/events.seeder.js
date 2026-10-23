import { Event } from '../models/index.js'

// Copied from portfolio-v2-react/src/lib/v2-data.js (`events`).
const events = [
  {
    eventDate: '2026-09-18',
    role: 'Keynote speaker',
    title: 'FIP World Congress — Industrial Section',
    summary:
      'Delivered the keynote on regulation as a growth engine, arguing that early engagement with authorities shortens time-to-patient across MENA.',
    location: 'Copenhagen, Denmark',
    imageUrl: '/images/v2/boardroom.png',
  },
  {
    eventDate: '2026-06-09',
    role: 'Panelist',
    title: 'Women in Pharma Leadership Forum',
    summary: 'Joined a panel on building the next generation of pharmacist executives in the Middle East.',
    location: 'Abu Dhabi, UAE',
    imageUrl: '/images/v2/pharmacy-night.png',
  },
  {
    eventDate: '2026-03-25',
    role: 'Moderator',
    title: 'Sterile Manufacturing GMP Roundtable',
    summary: 'Moderated a closed-door session with regional quality heads on inspection readiness and data integrity.',
    location: 'Riyadh, Saudi Arabia',
    imageUrl: '/images/v2/capsules.png',
  },
  {
    eventDate: '2025-11-12',
    role: 'Keynote speaker',
    title: 'MENA Regulatory Summit 2025',
    summary: 'Opening keynote on harmonising product registration timelines across GCC and Levant authorities.',
    location: 'Dubai, UAE',
    imageUrl: '/images/v2/molecule.png',
  },
  {
    eventDate: '2025-04-15',
    role: 'Guest lecturer',
    title: 'Regulatory Affairs Beyond Registration',
    summary: 'Lectured 5th-year pharmacy students on lifecycle strategy, pricing and post-approval data.',
    location: 'Irbid, Jordan',
    imageUrl: '/images/v2/research.png',
  },
  {
    eventDate: '2024-10-02',
    role: 'Workshop lead',
    title: 'External Reference Pricing Workshop',
    summary: 'Led a hands-on workshop for market access teams on reference baskets and reimbursement strategy.',
    location: 'Amman, Jordan',
    imageUrl: '/images/v2/boardroom.png',
  },
]

// Only seeds an empty table, so it is safe to re-run.
export async function seedEvents() {
  if (await Event.count()) return console.log('• events: already has data, skipped')
  await Event.bulkCreate(events)
  console.log(`• events: inserted ${events.length} rows`)
}
