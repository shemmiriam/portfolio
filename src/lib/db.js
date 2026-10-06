import { neon } from '@neondatabase/serverless';

let sql;
let ready;

// Lazy so `next build` works without DATABASE_URL
export const getSql = () => {
  if (!sql) sql = neon(process.env.DATABASE_URL);
  return sql;
};

export const ensureReviewsTable = () => {
  if (!ready) {
    ready = getSql()`
      CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        role TEXT,
        company TEXT,
        message TEXT NOT NULL,
        linkedin TEXT,
        status TEXT NOT NULL DEFAULT 'pending',
        ip_hash TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `.catch((err) => {
      ready = undefined;
      throw err;
    });
  }
  return ready;
};
