// Single entry point for all models. Associations between tables are defined here.
import { sequelize } from '../config/database.js'
import { Experience } from './experience.model.js'
import { Accomplishment } from './accomplishment.model.js'
import { ProfessionalProfile } from './professionalProfile.model.js'
import { ProfilePoint } from './profilePoint.model.js'
import { Membership } from './membership.model.js'
import { NewsCategory } from './newsCategory.model.js'
import { News } from './news.model.js'
import { Event } from './event.model.js'
import { Award } from './award.model.js'
import { Training } from './training.model.js'
import { Skill } from './skill.model.js'
import { Certification } from './certification.model.js'
import { Project } from './project.model.js'
import { Report } from './report.model.js'
import { GalleryImage } from './galleryImage.model.js'
import { ContactMessage } from './contactMessage.model.js'
import { ContactReply } from './contactReply.model.js'
import { User } from './user.model.js'

// A profile has many bullet points; deleting a profile deletes its points.
ProfessionalProfile.hasMany(ProfilePoint, {
  as: 'points',
  foreignKey: { name: 'profileId', allowNull: false },
  onDelete: 'CASCADE',
})
ProfilePoint.belongsTo(ProfessionalProfile, { as: 'profile', foreignKey: 'profileId' })

// Every news item belongs to one category; many news items can share it.
// RESTRICT: a category that still has news cannot be deleted.
NewsCategory.hasMany(News, {
  as: 'news',
  foreignKey: { name: 'categoryId', allowNull: false },
  onDelete: 'RESTRICT',
})
News.belongsTo(NewsCategory, {
  as: 'category',
  foreignKey: { name: 'categoryId', allowNull: false },
  onDelete: 'RESTRICT',
})

// A contact message can have several replies; deleting the message deletes its replies.
ContactMessage.hasMany(ContactReply, {
  as: 'replies',
  foreignKey: { name: 'messageId', allowNull: false },
  onDelete: 'CASCADE',
})
ContactReply.belongsTo(ContactMessage, { as: 'message', foreignKey: 'messageId' })

export {
  sequelize,
  Experience,
  Accomplishment,
  ProfessionalProfile,
  ProfilePoint,
  Membership,
  NewsCategory,
  News,
  Event,
  Award,
  Training,
  Skill,
  Certification,
  Project,
  Report,
  GalleryImage,
  ContactMessage,
  ContactReply,
  User,
}
