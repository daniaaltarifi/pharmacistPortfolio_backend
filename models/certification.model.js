import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database.js'

export const Certification = sequelize.define(
  'Certification',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: { notEmpty: true },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { notEmpty: true, len: [1, 2000] },
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { isInt: true, min: 1900, max: 2100 },
    },
    // Who issued the certification, e.g. "ASQ", "BSI Group".
    institution: {
      type: DataTypes.STRING(200),
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
    tableName: 'certifications',
    indexes: [{ name: 'certifications_year_idx', fields: ['year'] }],
  },
)
