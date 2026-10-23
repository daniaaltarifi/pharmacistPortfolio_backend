import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database.js'

// An email the admin sent in reply to a contact message. message_id is added by the association in models/index.js.
export const ContactReply = sequelize.define(
  'ContactReply',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    // "auto" = the fixed template, "custom" = written by the admin.
    type: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: { isIn: [['auto', 'custom']] },
    },
    subject: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: 'contact_replies',
    updatedAt: false, // created_at = when it was sent
    indexes: [{ name: 'contact_replies_message_id_idx', fields: ['message_id'] }],
  },
)
