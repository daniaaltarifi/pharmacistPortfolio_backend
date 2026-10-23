// Fills the tables with initial data. Run `npm run db:sync` first.
import { sequelize } from '../models/index.js'
import { seedExperiences } from '../seeders/experiences.seeder.js'
import { seedAccomplishments } from '../seeders/accomplishments.seeder.js'
import { seedProfessionalProfiles } from '../seeders/professionalProfiles.seeder.js'
import { seedMemberships } from '../seeders/memberships.seeder.js'
import { seedNews } from '../seeders/news.seeder.js'
import { seedEvents } from '../seeders/events.seeder.js'
import { seedAwards } from '../seeders/awards.seeder.js'
import { seedTrainings, seedSkills } from '../seeders/trainingsSkills.seeder.js'
import { seedCertifications } from '../seeders/certifications.seeder.js'
import { seedProjects } from '../seeders/projects.seeder.js'
import { seedReports } from '../seeders/reports.seeder.js'
import { seedGallery } from '../seeders/gallery.seeder.js'
import { seedAdmin } from '../seeders/admin.seeder.js'

try {
  await seedExperiences()
  await seedAccomplishments()
  await seedProfessionalProfiles()
  await seedMemberships()
  await seedNews()
  await seedEvents()
  await seedAwards()
  await seedTrainings()
  await seedSkills()
  await seedCertifications()
  await seedProjects()
  await seedReports()
  await seedGallery()
  await seedAdmin()
  console.log('✅ Seeding complete')
} catch (err) {
  console.error('❌ Seeding failed:', err.message)
  process.exitCode = 1
} finally {
  await sequelize.close()
}
