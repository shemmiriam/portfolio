import crypto from 'crypto';

export const SITE_URL = process.env.SITE_URL || 'https://portfolio-shemmiriam.vercel.app';
const TTL_MS = 14 * 24 * 60 * 60 * 1000;

const secret = () => process.env.APPROVAL_SECRET || process.env.ADMIN_PASSWORD || '';

const mac = (id, action, exp) =>
  crypto.createHmac('sha256', secret()).update(`${id}:${action}:${exp}`).digest('hex');

export const canSign = () => secret().length > 0;

export const signedUrl = (id, action) => {
  const exp = Date.now() + TTL_MS;
  const params = new URLSearchParams({ id: String(id), action, exp: String(exp), sig: mac(id, action, exp) });
  return `${SITE_URL}/review-action/?${params}`;
};

export const verify = (id, action, exp, sig) => {
  if (!canSign() || !['approve', 'reject'].includes(action)) return false;
  if (!Number.isFinite(Number(exp)) || Number(exp) < Date.now()) return false;
  const expected = Buffer.from(mac(id, action, exp));
  const given = Buffer.from(String(sig || ''));
  return expected.length === given.length && crypto.timingSafeEqual(expected, given);
};
