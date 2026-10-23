import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database.js'

export const ContactMessage = sequelize.define(
  'ContactMessage',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { len: [1, 5000] },
    },
  },
  {
    tableName: 'contact_messages',
    updatedAt: false,
  },
)
