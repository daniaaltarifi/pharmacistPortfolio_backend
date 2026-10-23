import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database.js'

export const Experience = sequelize.define(
  'Experience',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(120),
      allowNull: false,
      validate: { notEmpty: true, len: [1, 120] },
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { notEmpty: true, len: [1, 1000] },
    },
    sortOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: 'experiences',
    indexes: [{ name: 'experiences_sort_order_idx', fields: ['sort_order'] }],
  },
)
