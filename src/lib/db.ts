import { Pool } from 'pg';

const isProduction = process.env.NODE_ENV === 'production';

const dbPL = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction
    ? { rejectUnauthorized: true } // safer for production
    : { rejectUnauthorized: false }, // allow connection in dev
});

export default dbPL;
