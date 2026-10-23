import { Router } from 'express'
import authRoutes from './auth.routes.js'
import contactRoutes from './contact.routes.js'
import experienceRoutes from './experience.routes.js'
import accomplishmentRoutes from './accomplishment.routes.js'
import professionalProfileRoutes from './professionalProfile.routes.js'
import membershipRoutes from './membership.routes.js'
import newsRoutes from './news.routes.js'
import newsCategoryRoutes from './newsCategory.routes.js'
import eventRoutes from './event.routes.js'
import awardRoutes from './award.routes.js'
import trainingRoutes from './training.routes.js'
import skillRoutes from './skill.routes.js'
import certificationRoutes from './certification.routes.js'
import projectRoutes from './project.routes.js'
import reportRoutes from './report.routes.js'
import galleryRoutes from './galleryImage.routes.js'
import uploadRoutes from './upload.routes.js'
import { checkDbConnection } from '../config/database.js'

const router = Router()

router.get('/health', async (req, res) => {
  try {
    await checkDbConnection()
    res.json({ status: 'ok', database: 'connected', time: new Date().toISOString() })
  } catch (err) {
    res.status(503).json({ status: 'error', database: 'disconnected', message: err.message, time: new Date().toISOString() })
  }
})

router.use('/auth', authRoutes)
router.use('/contact', contactRoutes)
router.use('/experiences', experienceRoutes)
router.use('/accomplishments', accomplishmentRoutes)
router.use('/profiles', professionalProfileRoutes)
router.use('/memberships', membershipRoutes)
router.use('/news', newsRoutes)
router.use('/news-categories', newsCategoryRoutes)
router.use('/events', eventRoutes)
router.use('/awards', awardRoutes)
router.use('/trainings', trainingRoutes)
router.use('/skills', skillRoutes)
router.use('/certifications', certificationRoutes)
router.use('/projects', projectRoutes)
router.use('/reports', reportRoutes)
router.use('/gallery', galleryRoutes)
router.use('/uploads', uploadRoutes)

export default router
