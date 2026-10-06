import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';

const Wrap = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 1.6rem 6rem;
  color: #fff;
  h1 { font-size: 2.6rem; margin-bottom: 2rem; }
`;
const Item = styled.div`
  background: ${({ theme }) => theme.colors.background2};
  border-radius: 10px;
  padding: 1.6rem;
  margin-bottom: 1.4rem;
  font-size: 1.4rem;
  line-height: 1.6;
  p { margin: 0.6rem 0 1rem; color: #ddd; }
  small { color: #999; }
`;
const Btn = styled.button`
  font: inherit;
  font-size: 1.4rem;
  padding: 0.8rem 1.4rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: ${({ $primary }) => ($primary ? '#18C5DD' : 'transparent')};
  color: ${({ $primary }) => ($primary ? '#0f1624' : '#fff')};
  margin-right: 0.8rem;
  cursor: pointer;
`;
const Input = styled.input`
  font: inherit;
  font-size: 1.6rem;
  padding: 1rem 1.2rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: #0f1624;
  color: #fff;
  margin-right: 0.8rem;
`;

export default function ReviewsAdmin() {
  const [pw, setPw] = useState('');
  const [authed, setAuthed] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  const load = useCallback(async (password) => {
    const res = await fetch('/api/admin/reviews/', { headers: { 'x-admin-password': password } });
    if (!res.ok) {
      setAuthed(false);
      setError(res.status === 401 ? 'Wrong password.' : 'Could not load reviews.');
      return;
    }
    setItems((await res.json()).reviews);
    setAuthed(true);
    setError('');
    try { sessionStorage.setItem('rv-pw', password); } catch (e) { /* ignore */ }
  }, []);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('rv-pw');
      if (saved) { setPw(saved); load(saved); }
    } catch (e) { /* ignore */ }
  }, [load]);

  const act = async (id, action) => {
    if (action === 'delete' && !window.confirm('Delete this review permanently?')) return;
    await fetch('/api/admin/reviews/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': pw },
      body: JSON.stringify({ id, action }),
    });
    load(pw);
  };

  return (
    <Wrap>
      <Head>
        <title>Review moderation</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <h1>Review moderation</h1>
      {!authed ? (
        <form onSubmit={(e) => { e.preventDefault(); load(pw); }}>
          <Input type="password" placeholder="Admin password" value={pw} onChange={(e) => setPw(e.target.value)} autoFocus />
          <Btn $primary type="submit">Sign in</Btn>
          {error && <p style={{ color: '#ff8a8a', fontSize: '1.4rem' }}>{error}</p>}
        </form>
      ) : (
        <>
          {items.length === 0 && <p>No reviews yet.</p>}
          {items.map((r) => (
            <Item key={r.id}>
              <strong>{r.name}</strong> <small>· {[r.role, r.company].filter(Boolean).join(', ')} · {r.status}</small>
              <p>{r.message}</p>
              {r.linkedin && <p><a href={r.linkedin} target="_blank" rel="noopener noreferrer nofollow" style={{ color: '#18C5DD' }}>{r.linkedin}</a></p>}
              {r.status !== 'approved' && <Btn $primary onClick={() => act(r.id, 'approve')}>Approve</Btn>}
              {r.status === 'approved' && <Btn onClick={() => act(r.id, 'reject')}>Unpublish</Btn>}
              <Btn onClick={() => act(r.id, 'delete')}>Delete</Btn>
            </Item>
          ))}
        </>
      )}
    </Wrap>
  );
}
