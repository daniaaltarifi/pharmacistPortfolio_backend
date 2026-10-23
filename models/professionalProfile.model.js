import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database.js'

const yearValidation = { isInt: true, min: 1900, max: 2100 }

export const ProfessionalProfile = sequelize.define(
  'ProfessionalProfile',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    role: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: { notEmpty: true },
    },
    org: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: { notEmpty: true },
    },
    place: {
      type: DataTypes.STRING(120),
      allowNull: false,
      validate: { notEmpty: true },
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { notEmpty: true, len: [1, 1000] },
    },
    startYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: yearValidation,
    },
    // null = current position ("Present").
    endYear: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: yearValidation,
    },
    sortOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: 'professional_profiles',
    indexes: [{ name: 'professional_profiles_sort_order_idx', fields: ['sort_order'] }],
    validate: {
      endYearAfterStartYear() {
        if (this.endYear != null && this.endYear < this.startYear) {
          throw new Error('endYear cannot be before startYear')
        }
      },
    },
  },
)
