import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database.js'

// One photo in the gallery page, with an optional title shown as its caption.
export const GalleryImage = sequelize.define(
  'GalleryImage',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    // A Supabase Storage URL from POST /api/uploads/images, or a site path like "/images/...".
    imageUrl: {
      type: DataTypes.STRING(500),
      allowNull: false,
      validate: { notEmpty: true },
    },
    // Optional caption; existing photos have none (null).
    title: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
  },
  {
    tableName: 'gallery_images',
    indexes: [{ name: 'gallery_images_created_at_idx', fields: ['created_at'] }],
  },
)
