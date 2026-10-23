import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database.js'

export const Award = sequelize.define(
  'Award',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { isInt: true, min: 1900, max: 2100 },
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: { notEmpty: true },
    },
    // Who gave the award, e.g. "PharmaVoice Global".
    issuer: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: { notEmpty: true },
    },
    // Optional: shown in the expandable drawer.
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: { len: [0, 2000] },
    },
    // Optional: a Supabase Storage URL from POST /api/uploads/images, or a site path like "/images/...".
    imageUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
  },
  {
    tableName: 'awards',
    indexes: [{ name: 'awards_year_idx', fields: ['year'] }],
  },
)
