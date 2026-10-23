import { Accomplishment } from '../models/index.js'

// Copied from portfolio-v2-react/src/lib/accomplishments-data.js (`accomplishmentsData`).
const accomplishments = [
  {
    metric: 'JPD',
    title: 'Vital Amendments to JPD Tenders',
    organization: 'JAPM & Company',
    body: 'Spearheaded vital amendments for Tenders Special Conditions of the Joint Procurement Department (JPD) representing JAPM and company interests.',
  },
  {
    metric: 'Reg',
    title: 'Product Registration & Facilitation',
    organization: 'Regulatory Affairs',
    body: 'Professional facilitation and acceleration of key products registration alongside professional handling of emerging regulatory difficulties.',
  },
  {
    metric: 'BI',
    title: 'Business Intelligence Reports',
    organization: 'Market Strategy',
    body: 'Authored periodic & special-case BI reports covering Regulatory Intelligence, Competitive Intelligence, and Market Intelligence.',
  },
  {
    metric: 'Academia',
    title: 'Academic Research Commercialization',
    organization: 'Academia',
    body: 'Built productive bridges with academia to commercialize research and translate academic innovations into market solutions.',
  },
  {
    metric: '1st',
    title: 'Pioneered Regulatory Course at JUST',
    organization: 'Faculty of Pharmacy - JUST',
    body: 'Initiated and coordinated the first-of-its-kind undergraduate Regulatory Affairs course (3 Credit Hours) for 5th-year students at JUST.',
  },
  {
    metric: 'B2B',
    title: 'Global & Local Business Expansion',
    organization: 'Partnerships',
    body: 'Unlocked and cultivated new strategic business opportunities with multinational and local partners.',
  },
  {
    metric: 'Gov',
    title: 'Proactive Regulatory Engagement',
    organization: 'Regulators',
    body: 'Proactively interacted with regulatory authorities during the issuance and refinement of new pharmaceutical regulations.',
  },
  {
    metric: 'ROI',
    title: 'Tender Financial Optimization',
    organization: 'Hikma',
    body: 'Improved financial metrics with noticeable increase in profitability, penalty reduction, and exceeding sales targets using a methodological approach.',
  },
  {
    metric: 'Brand',
    title: 'Brand Kits for Key Products',
    organization: 'Hikma',
    body: 'Developed and launched comprehensive new Brand Kits for key strategic products in the portfolio.',
  },
  {
    metric: '#1',
    title: 'ATC Group Market Leadership',
    organization: 'Hikma / Solvay',
    body: 'Drove major products (e.g., Suprax) to lead their respective ATC groups or secure dominant market share positions.',
  },
  {
    metric: '#13',
    title: 'Top 13 Rank & 1.3%+ Market Share',
    organization: 'Solvay (IMS Q4, 2010)',
    body: 'Positioned company as the 13th ranked international player with 5 major products leading their ATC groups and MS > 1.3%.',
  },
  {
    metric: 'Iraq',
    title: 'Iraq Market Turnaround & Growth',
    organization: 'Solvay & Hikma',
    body: 'Restructured and aligned business strategy in Iraq with stakeholders, yielding strong target results.',
  },
]

// Only seeds an empty table, so it is safe to re-run.
export async function seedAccomplishments() {
  if (await Accomplishment.count()) return console.log('• accomplishments: already has data, skipped')
  await Accomplishment.bulkCreate(accomplishments.map((a, i) => ({ ...a, sortOrder: i + 1 })))
  console.log(`• accomplishments: inserted ${accomplishments.length} rows`)
}
