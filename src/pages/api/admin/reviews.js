import crypto from 'crypto';
import { getSql, ensureReviewsTable } from '../../../lib/db';

const authorised = (req) => {
  const expected = process.env.ADMIN_PASSWORD;
  const given = req.headers['x-admin-password'];
  if (!expected || typeof given !== 'string') return false;
  const a = crypto.createHash('sha256').update(given).digest();
  const b = crypto.createHash('sha256').update(expected).digest();
  return crypto.timingSafeEqual(a, b);
};

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (!authorised(req)) return res.status(401).json({ error: 'Unauthorised' });

  try {
    await ensureReviewsTable();
    const sql = getSql();

    if (req.method === 'GET') {
      const rows = await sql`
        SELECT id, name, role, company, message, linkedin, status, created_at
        FROM reviews
        ORDER BY (status = 'pending') DESC, created_at DESC LIMIT 200`;
      return res.status(200).json({ reviews: rows });
    }

    if (req.method === 'POST') {
      const id = Number((req.body || {}).id);
      const action = (req.body || {}).action;
      if (!Number.isInteger(id)) return res.status(400).json({ error: 'Bad id' });
      if (action === 'approve') await sql`UPDATE reviews SET status = 'approved' WHERE id = ${id}`;
      else if (action === 'reject') await sql`UPDATE reviews SET status = 'rejected' WHERE id = ${id}`;
      else if (action === 'delete') await sql`DELETE FROM reviews WHERE id = ${id}`;
      else return res.status(400).json({ error: 'Bad action' });
      return res.status(200).json({ ok: true });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('admin reviews error', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
