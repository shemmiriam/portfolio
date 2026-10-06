import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  width: 100%;
  padding-bottom: 3rem;
`;

const Heading = styled.h3`
  font-size: 2.2rem;
  font-weight: 700;
  color: #9cc9e3;
  margin: 0 0 1.6rem;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.8rem;
  a { font-size: 1.4rem; font-weight: 400; color: ${({ theme }) => theme.colors.link}; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.4rem;
  @media ${({ theme }) => theme.breakpoints.md} { grid-template-columns: repeat(2, 1fr); }
  @media ${({ theme }) => theme.breakpoints.sm} { grid-template-columns: 1fr; }
`;

const Repo = styled.a`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 1.6rem;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.background2};
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: 0.3s ease;
  &:hover { border-color: ${({ theme }) => theme.colors.link}; transform: translateY(-2px); }
`;

const Name = styled.span`
  font-size: 1.6rem;
  font-weight: 600;
  color: #fff;
  word-break: break-word;
`;

const Desc = styled.span`
  font-size: 1.3rem;
  line-height: 1.5;
  color: #bbb;
  flex: 1;
`;

const Meta = styled.span`
  font-size: 1.2rem;
  color: #999;
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
`;

const fmt = (iso) =>
  new Date(iso).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });

const LatestGitHub = () => {
  const [repos, setRepos] = useState([]);
  const [profile, setProfile] = useState('');

  useEffect(() => {
    fetch('/api/github/')
      .then((r) => (r.ok ? r.json() : { repos: [] }))
      .then((d) => {
        setRepos(d.repos || []);
        setProfile(d.profile || '');
      })
      .catch(() => {});
  }, []);

  // Nothing to show (or GitHub unreachable): render nothing rather than an empty box
  if (!repos.length) return null;

  return (
    <Wrap>
      <Heading>
        Latest on GitHub
        {profile && (
          <a href={profile} target="_blank" rel="noopener noreferrer">View all →</a>
        )}
      </Heading>
      <Grid>
        {repos.map((r) => (
          <Repo key={r.name} href={r.url} target="_blank" rel="noopener noreferrer">
            <Name>{r.name}</Name>
            {r.description && <Desc>{r.description}</Desc>}
            <Meta>
              {r.language && <span>● {r.language}</span>}
              {r.stars > 0 && <span>★ {r.stars}</span>}
              <span>Updated {fmt(r.pushedAt)}</span>
            </Meta>
          </Repo>
        ))}
      </Grid>
    </Wrap>
  );
};

export default LatestGitHub;
