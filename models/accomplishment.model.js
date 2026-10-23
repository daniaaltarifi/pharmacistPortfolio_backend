import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database.js'

export const Accomplishment = sequelize.define(
  'Accomplishment',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    // Short label shown on the dial node, e.g. "JPD", "#1".
    metric: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: { notEmpty: true },
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: { notEmpty: true },
    },
    organization: {
      type: DataTypes.STRING(120),
      allowNull: false,
      validate: { notEmpty: true },
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
    tableName: 'accomplishments',
    indexes: [{ name: 'accomplishments_sort_order_idx', fields: ['sort_order'] }],
  },
)
