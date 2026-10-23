import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database.js'

export const Event = sequelize.define(
  'Event',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    eventDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: { isDate: true },
    },
    // e.g. "Keynote speaker", "Panelist", "Moderator".
    role: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: { notEmpty: true },
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: { notEmpty: true },
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { notEmpty: true, len: [1, 2000] },
    },
    // "City, Country", e.g. "Copenhagen, Denmark".
    location: {
      type: DataTypes.STRING(150),
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
    tableName: 'events',
    indexes: [{ name: 'events_event_date_idx', fields: ['event_date'] }],
  },
)
