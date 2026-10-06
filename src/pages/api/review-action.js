import { getSql, ensureReviewsTable } from '../../lib/db';
import { verify } from '../../lib/approval';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const src = req.method === 'POST' ? req.body || {} : req.query;
  const id = Number(src.id);
  const { action, exp, sig } = src;

  if (!Number.isInteger(id) || !verify(id, action, exp, sig)) {
    return res.status(400).json({ error: 'This link is invalid or has expired.' });
  }

  try {
    await ensureReviewsTable();
    const sql = getSql();

    if (req.method === 'GET') {
      const rows = await sql`SELECT id, name, role, company, message, linkedin, status FROM reviews WHERE id = ${id}`;
      if (!rows.length) return res.status(404).json({ error: 'That review no longer exists.' });
      return res.status(200).json({ review: rows[0], action });
    }

    if (req.method === 'POST') {
      const status = action === 'approve' ? 'approved' : 'rejected';
      const rows = await sql`UPDATE reviews SET status = ${status} WHERE id = ${id} RETURNING id`;
      if (!rows.length) return res.status(404).json({ error: 'That review no longer exists.' });
      return res.status(200).json({ ok: true, status });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('review-action error', err);
    return res.status(500).json({ error: 'Server error. Please try again.' });
  }
}
