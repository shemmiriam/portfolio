import crypto from 'crypto';
import { getSql, ensureReviewsTable } from '../../lib/db';

const clean = (v, max) => (typeof v === 'string' ? v.trim().replace(/\s+/g, ' ').slice(0, max) : '');

const hashIp = (req) => {
  const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();
  return crypto
    .createHash('sha256')
    .update(ip + (process.env.ADMIN_PASSWORD || ''))
    .digest('hex');
};

export default async function handler(req, res) {
  try {
    await ensureReviewsTable();
    const sql = getSql();

    if (req.method === 'GET') {
      const rows = await sql`
        SELECT id, name, role, company, message, linkedin, created_at
        FROM reviews WHERE status = 'approved' ORDER BY created_at DESC LIMIT 50`;
      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
      return res.status(200).json({ reviews: rows });
    }

    if (req.method === 'POST') {
      const b = req.body || {};
      // Honeypot: real visitors never fill this hidden field
      if (b.website) return res.status(200).json({ ok: true });

      const name = clean(b.name, 80);
      const role = clean(b.role, 100);
      const company = clean(b.company, 100);
      const message = clean(b.message, 600);
      let linkedin = clean(b.linkedin, 200);

      if (name.length < 2) return res.status(400).json({ error: 'Please enter your name.' });
      if (message.length < 20) {
        return res.status(400).json({ error: 'Please write at least a couple of sentences (20+ characters).' });
      }
      if (b.consent !== true) {
        return res.status(400).json({ error: 'Please confirm you are happy for your review to be shown publicly.' });
      }
      if (linkedin && !/^https:\/\/([a-z0-9-]+\.)?linkedin\.com\//i.test(linkedin)) {
        return res.status(400).json({ error: 'The LinkedIn link must start with https://linkedin.com/' });
      }
      if (/https?:\/\//i.test(message)) {
        return res.status(400).json({ error: 'Please leave links out of the review text.' });
      }

      const ipHash = hashIp(req);
      const [{ count }] = await sql`
        SELECT count(*)::int AS count FROM reviews
        WHERE ip_hash = ${ipHash} AND created_at > now() - interval '1 hour'`;
      if (count >= 3) {
        return res.status(429).json({ error: 'Too many submissions. Please try again later.' });
      }

      await sql`
        INSERT INTO reviews (name, role, company, message, linkedin, ip_hash)
        VALUES (${name}, ${role}, ${company}, ${message}, ${linkedin}, ${ipHash})`;
      return res.status(201).json({ ok: true });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('reviews api error', err);
    return res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
}
