import { personalInfo } from '../../constants/constants';

const username = (personalInfo.github || '').split('github.com/')[1]?.split('/')[0];
const LIMIT = 6;
// The site's own repo would just link back to itself
const SKIP = new Set(['portfolio']);

export default async function handler(req, res) {
  if (!username) return res.status(200).json({ repos: [], languages: [] });
  try {
    const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'portfolio-site' };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const r = await fetch(
      `https://api.github.com/users/${username}/repos?sort=pushed&direction=desc&per_page=40&type=owner`,
      { headers }
    );
    if (!r.ok) throw new Error(`GitHub responded ${r.status}`);
    const data = await r.json();
    const own = data.filter((x) => !x.fork && !x.archived && !x.private && !SKIP.has(x.name));

    // Language tally across all of the user's own repos (not just the latest few)
    const counts = {};
    own.forEach((x) => {
      if (x.language) counts[x.language] = (counts[x.language] || 0) + 1;
    });
    const languages = Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
      .slice(0, 8);

    const repos = own
      .slice(0, LIMIT)
      .map((x) => ({
        name: x.name,
        description: x.description || '',
        language: x.language || '',
        url: x.html_url,
        pushedAt: x.pushed_at,
        stars: x.stargazers_count,
      }));
    // Shared CDN cache, so GitHub is hit about once an hour however many visitors there are
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).json({ repos, languages, profile: personalInfo.github });
  } catch (err) {
    console.error('github api error', err);
    return res.status(502).json({ repos: [], languages: [] });
  }
}
