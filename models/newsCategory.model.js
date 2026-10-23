import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database.js'

export const NewsCategory = sequelize.define(
  'NewsCategory',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: { notEmpty: true },
    },
  },
  {
    tableName: 'news_categories',
    indexes: [
      // Case-insensitive unique: "Keynote" and "keynote" can't both exist.
      { name: 'news_categories_name_lower_unique', unique: true, fields: [sequelize.fn('lower', sequelize.col('name'))] },
    ],
  },
)
