require('dotenv').config();

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// const db = pgp(
//   `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
// );

module.exports = prisma;
