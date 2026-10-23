import { Sequelize } from 'sequelize'
import { env } from './env.js'

export const sequelize = new Sequelize(env.databaseUrl, {
  dialect: 'postgres',
  dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
  logging: false,
  // camelCase attributes in JS <-> snake_case columns in the DB (createdAt -> created_at).
  define: { underscored: true },
})

export async function checkDbConnection() {
  await sequelize.authenticate()
}
