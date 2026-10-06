[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](LICENSE)

# Miriam Shem — Portfolio

Personal portfolio site for Miriam Shem, Software Engineer. Built with Next.js and styled-components, with all content (projects, experience, certifications, skills, timeline) managed through a CMS rather than hardcoded — updating the site doesn't require touching code. Visitors can also leave reviews, which are moderated by email before they appear.

**Live site:** [portfolio-shemmiriam.vercel.app](https://portfolio-shemmiriam.vercel.app)

## Tech stack

- [Next.js 10](https://nextjs.org/) (server-rendered pages + API routes) + React
- [styled-components](https://styled-components.com/) for styling
- [Decap CMS](https://decapcms.org/) for content management, backed by JSON files in `/content`
- [Neon Postgres](https://neon.tech/) (via the Vercel Marketplace) for visitor reviews
- [Resend](https://resend.com/) for review notification emails
- Deployed on [Vercel](https://vercel.com/), auto-deploying from `main`

## Getting started

```bash
npm install
vercel env pull .env.local   # database + secrets (needs the Vercel CLI and project access)
npm run dev
```

Works on Node 20 locally (Vercel builds with Node 24). The site runs at `http://localhost:3000`. Without `.env.local` the site still renders, but the Reviews section's API calls will fail.

On Node 17+, Next.js 10 needs `--openssl-legacy-provider`; `.npmrc` and `vercel.json` already set it for installs and Vercel builds.

## Content management

All site content — projects, work experience, certifications, skills, timeline, and personal info — lives in `/content/*.json` and can be edited two ways:

- **Directly**, by editing the JSON files in `/content`.
- **Through the CMS UI** at `/admin`, which provides a form-based editor for each content type.

### Editing locally

The CMS can run entirely offline against your local files — no login required:

1. Make sure `local_backend: true` is set in `public/admin/config.yml` (it is, by default).
2. Run the local CMS proxy in a separate terminal: `npx decap-server`
3. With the dev server also running, open `http://localhost:3000/admin/index.html`.

Changes made through the CMS write directly to your local `/content` files — review and commit them like any other change.

### Editing on production

The live CMS at `/admin` authenticates through Netlify Identity + Git Gateway, which commits changes straight to `main` (triggering a redeploy on Vercel). This requires a Netlify site connected to this repo with Identity and Git Gateway enabled — see `public/admin/config.yml` for the backend configuration. The Netlify site is only used for sign-in; the site itself is hosted on Vercel, so Netlify's own builds can be turned off.

## Deployment

Pushes to `main` auto-deploy to Vercel (production branch). The site is no longer a static export, because reviews need API routes, so `next export` is not supported.

## Reviews

Visitors submit a review from the **Reviews** section. Submissions are stored in Neon Postgres as `pending` and only appear on the site once approved.

- **Email approval:** each new review emails the owner a signed **Approve** / **Reject** link (valid 14 days). The link opens a confirmation page at `/review-action`.
- **Moderation page:** `/reviews-admin` (password protected, `noindex`) lists every review with approve, unpublish and delete.
- **Spam protection:** hidden honeypot field, a limit of 3 submissions per hour per visitor, and links are not allowed in review text.

### Environment variables

Set these in Vercel (Settings → Environment Variables) for Production, Preview and Development:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` (and other `POSTGRES_*`) | Added automatically by the Neon integration |
| `ADMIN_PASSWORD` | Signs in to `/reviews-admin` and signs the email approval links. Changing it invalidates old email links |
| `RESEND_API_KEY` | Sends the notification emails |
| `REVIEW_NOTIFY_EMAIL` *(optional)* | Where notifications go (defaults to the owner's Gmail) |
| `REVIEW_FROM_EMAIL` *(optional)* | Sender address. The default `onboarding@resend.dev` only delivers to the Resend account's own email and often lands in spam; use a verified domain to fix that |
| `APPROVAL_SECRET` *(optional)* | Separate signing key; falls back to `ADMIN_PASSWORD` |

The `reviews` table is created automatically on first use.

## License

[MIT](LICENSE) — originally based on a portfolio template by Vipul Jha and Adrian Hajdin.
