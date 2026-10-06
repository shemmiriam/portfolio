import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  padding: 2.4rem 0 1rem;
`;

const Label = styled.p`
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.55);
  margin-bottom: 1rem;
`;

const Chips = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  padding: 0;
  margin: 0;
  list-style: none;
`;

const Chip = styled.li`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.link};
  background: rgba(24, 197, 221, 0.1);
  border: 1px solid rgba(24, 197, 221, 0.3);
  border-radius: 999px;
  padding: 0.4rem 1.2rem;
  span { color: #999; margin-left: 0.5rem; }
`;

// Languages across the owner's public GitHub repos, from the same cached /api/github data
const GitHubLanguages = () => {
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    fetch('/api/github/')
      .then((r) => (r.ok ? r.json() : { languages: [] }))
      .then((d) => setLanguages(d.languages || []))
      .catch(() => {});
  }, []);

  if (!languages.length) return null;

  return (
    <Wrap>
      <Label>Languages across my public GitHub repositories</Label>
      <Chips>
        {languages.map((l) => (
          <Chip key={l.name}>
            {l.name}
            <span>{l.count} {l.count === 1 ? 'repo' : 'repos'}</span>
          </Chip>
        ))}
      </Chips>
    </Wrap>
  );
};

export default GitHubLanguages;
