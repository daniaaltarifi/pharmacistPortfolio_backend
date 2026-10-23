import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database.js'

export const Report = sequelize.define(
  'Report',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    publishedAt: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: { isDate: true },
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: { notEmpty: true },
    },
    // Full text, shown on the details page (cards show it truncated).
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { notEmpty: true },
    },
    // Optional: a Supabase Storage URL from POST /api/uploads/images, or a site path like "/images/...".
    imageUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
  },
  {
    tableName: 'reports',
    indexes: [{ name: 'reports_published_at_idx', fields: ['published_at'] }],
  },
)
