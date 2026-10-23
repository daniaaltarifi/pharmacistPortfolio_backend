import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database.js'

// One bullet point of a ProfessionalProfile (one-to-many). profile_id is added by the association in models/index.js.
export const ProfilePoint = sequelize.define(
  'ProfilePoint',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { notEmpty: true, len: [1, 500] },
    },
    sortOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: 'profile_points',
    indexes: [{ name: 'profile_points_profile_id_sort_order_idx', fields: ['profile_id', 'sort_order'] }],
  },
)
