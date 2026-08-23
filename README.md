[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](LICENSE)

# Miriam Shem — Portfolio

Personal portfolio site for Miriam Shem, Software Engineer. Built with Next.js and styled-components, with all content (projects, experience, certifications, skills, timeline) managed through a CMS rather than hardcoded — updating the site doesn't require touching code.

**Live site:** [portfolio-shemmiriam.vercel.app](https://portfolio-shemmiriam.vercel.app)

## Tech stack

- [Next.js 10](https://nextjs.org/) (static export) + React
- [styled-components](https://styled-components.com/) for styling
- [Decap CMS](https://decapcms.org/) for content management, backed by JSON files in `/content`
- Deployed on [Vercel](https://vercel.com/), auto-deploying from `main`

## Getting started

```bash
yarn && yarn dev
```

Requires Node 18–20. The site runs at `http://localhost:3000`.

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

The live CMS at `/admin` authenticates through Netlify Identity + Git Gateway, which commits changes straight to `main` (triggering a redeploy on Vercel). This requires a Netlify site connected to this repo with Identity and Git Gateway enabled — see `public/admin/config.yml` for the backend configuration.

## Deployment

Pushes to `main` auto-deploy to Vercel. To build a static export manually:

```bash
yarn build:static
```

## License

[MIT](LICENSE) — originally based on a portfolio template by Vipul Jha and Adrian Hajdin.
