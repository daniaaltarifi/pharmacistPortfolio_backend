import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database.js'

export const Training = sequelize.define(
  'Training',
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
    // Who delivered it, e.g. "Harvard Business School".
    provider: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: { notEmpty: true },
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { isInt: true, min: 1900, max: 2100 },
    },
  },
  {
    tableName: 'trainings',
    indexes: [{ name: 'trainings_year_idx', fields: ['year'] }],
  },
)
