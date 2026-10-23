import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database.js'

// One row per skill, shown as a "periodic table" tile.
export const Skill = sequelize.define(
  'Skill',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: { notEmpty: true },
    },
    // Element-style symbol on the tile, e.g. "Es", "Ma".
    symbol: {
      type: DataTypes.STRING(3),
      allowNull: false,
      validate: { notEmpty: true, len: [1, 3] },
    },
    // Tile order; also the tile number (01, 02, ...).
    sortOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: 'skills',
    indexes: [
      // Case-insensitive unique name and symbol.
      { name: 'skills_name_lower_unique', unique: true, fields: [sequelize.fn('lower', sequelize.col('name'))] },
      { name: 'skills_symbol_lower_unique', unique: true, fields: [sequelize.fn('lower', sequelize.col('symbol'))] },
      { name: 'skills_sort_order_idx', fields: ['sort_order'] },
    ],
  },
)
