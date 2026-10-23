import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database.js'

export const Project = sequelize.define(
  'Project',
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
    // Short tags shown as chips, e.g. ["Cross-border compliance", "Fast-track approvals"].
    // A Postgres text[] column: always read/written together with the project.
    highlights: {
      type: DataTypes.ARRAY(DataTypes.STRING(60)),
      allowNull: false,
      defaultValue: [],
    },
    // Optional: a Supabase Storage URL from POST /api/uploads/images, or a site path like "/images/...".
    imageUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
  },
  {
    tableName: 'projects',
  },
)
