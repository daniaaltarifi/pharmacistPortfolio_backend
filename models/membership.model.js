import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database.js'

export const SECTORS = ['Private', 'Governmental']

export const Membership = sequelize.define(
  'Membership',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    org: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: { notEmpty: true },
    },
    role: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: { notEmpty: true },
    },
    // Optional: "Private" / "Governmental".
    sector: {
      type: DataTypes.STRING(20),
      allowNull: true,
      validate: { isIn: [SECTORS] },
    },
    // Free text written by the admin, e.g. "2022 till now", "2020-22, 25-26".
    period: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: { notEmpty: true },
    },
    sortOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: 'memberships',
    indexes: [{ name: 'memberships_sort_order_idx', fields: ['sort_order'] }],
  },
)
