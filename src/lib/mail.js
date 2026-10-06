import { signedUrl, canSign } from './approval';

const esc = (s) =>
  String(s || '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const TO = process.env.REVIEW_NOTIFY_EMAIL || 'shemmiriam93@gmail.com';
// onboarding@resend.dev works without owning a domain, but only delivers to the Resend account's own email
const FROM = process.env.REVIEW_FROM_EMAIL || 'Portfolio Reviews <onboarding@resend.dev>';

// Never throws: a mail problem must not stop a visitor's review from being saved
export const notifyNewReview = async (review) => {
  if (!process.env.RESEND_API_KEY || !canSign()) {
    console.warn('review notification skipped: RESEND_API_KEY or ADMIN_PASSWORD/APPROVAL_SECRET missing');
    return;
  }
  const approve = signedUrl(review.id, 'approve');
  const reject = signedUrl(review.id, 'reject');
  const who = [review.role, review.company].filter(Boolean).join(', ');
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;font-size:16px;line-height:1.5">
      <h2 style="margin:0 0 8px">New review on your portfolio</h2>
      <p style="margin:0 0 4px"><strong>${esc(review.name)}</strong>${who ? ` &middot; ${esc(who)}` : ''}</p>
      ${review.linkedin ? `<p style="margin:0 0 4px">${esc(review.linkedin)}</p>` : ''}
      <blockquote style="margin:16px 0;padding:12px 16px;background:#f3f4f6;border-left:4px solid #18C5DD">${esc(review.message)}</blockquote>
      <p>
        <a href="${approve}" style="display:inline-block;padding:12px 22px;background:#0a7d3c;color:#fff;border-radius:8px;text-decoration:none;margin-right:8px">Review &amp; approve</a>
        <a href="${reject}" style="display:inline-block;padding:12px 22px;background:#b42318;color:#fff;border-radius:8px;text-decoration:none">Reject</a>
      </p>
      <p style="color:#666;font-size:13px">Each link opens a page where you confirm. Links expire after 14 days.</p>
    </div>`;
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: FROM, to: [TO], subject: `New portfolio review from ${review.name}`, html }),
    });
    if (!res.ok) console.error('resend error', res.status, await res.text());
  } catch (err) {
    console.error('resend request failed', err);
  }
};
