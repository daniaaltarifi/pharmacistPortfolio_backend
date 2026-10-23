import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database.js'

// category_id (-> news_categories) is added by the association in models/index.js.
export const News = sequelize.define(
  'News',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    publishedAt: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: { isDate: true },
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: { notEmpty: true },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { notEmpty: true },
    },
    // e.g. "/images/v2/boardroom.png" or a full https:// URL.
    imageUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    // Optional external link (original article, event website, ...). Absolute http(s) URL.
    link: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
  },
  {
    tableName: 'news',
    indexes: [
      { name: 'news_published_at_idx', fields: ['published_at'] },
      { name: 'news_category_id_idx', fields: ['category_id'] },
    ],
  },
)
