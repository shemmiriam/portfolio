import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';

const Wrap = styled.div`
  max-width: 560px;
  margin: 0 auto;
  padding: 4rem 1.6rem;
  color: #fff;
  h1 { font-size: 2.4rem; margin-bottom: 1.6rem; }
`;
const Card = styled.div`
  background: ${({ theme }) => theme.colors.background2};
  border-radius: 12px;
  padding: 2rem;
  font-size: 1.5rem;
  line-height: 1.6;
  p { margin: 0.8rem 0 1.4rem; color: #ddd; }
  small { color: #aaa; }
`;
const Btn = styled.button`
  font: inherit;
  font-size: 1.6rem;
  font-weight: 600;
  width: 100%;
  padding: 1.2rem;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  color: #fff;
  background: ${({ $reject }) => ($reject ? '#b42318' : '#0a7d3c')};
  &:disabled { opacity: 0.6; }
`;

export default function ReviewAction() {
  const [params, setParams] = useState(null);
  const [state, setState] = useState({ phase: 'loading' });

  useEffect(() => {
    const q = Object.fromEntries(new URLSearchParams(window.location.search));
    setParams(q);
    fetch('/api/review-action/?' + new URLSearchParams(q))
      .then(async (r) => {
        const d = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(d.error || 'This link is invalid or has expired.');
        setState({ phase: 'ready', review: d.review, action: d.action });
      })
      .catch((e) => setState({ phase: 'error', message: e.message }));
  }, []);

  const confirm = async () => {
    setState((s) => ({ ...s, phase: 'sending' }));
    try {
      const r = await fetch('/api/review-action/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d.error || 'Something went wrong.');
      setState((s) => ({ ...s, phase: 'done', status: d.status }));
    } catch (e) {
      setState((s) => ({ ...s, phase: 'ready', error: e.message }));
    }
  };

  const { phase, review, action } = state;
  const approving = action === 'approve';

  return (
    <Wrap>
      <Head>
        <title>Review action</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <h1>{approving === undefined ? 'Review' : approving ? 'Approve this review?' : 'Reject this review?'}</h1>
      {phase === 'loading' && <p>Loading…</p>}
      {phase === 'error' && <Card>{state.message}</Card>}
      {(phase === 'ready' || phase === 'sending') && review && (
        <Card>
          <strong>{review.name}</strong>{' '}
          <small>{[review.role, review.company].filter(Boolean).join(', ')}</small>
          <p>{review.message}</p>
          <small>Currently: {review.status}</small>
          {state.error && <p style={{ color: '#ff8a8a' }}>{state.error}</p>}
          <div style={{ marginTop: '1.4rem' }}>
            <Btn $reject={!approving} onClick={confirm} disabled={phase === 'sending'}>
              {phase === 'sending' ? 'Saving…' : approving ? 'Yes, publish it' : 'Yes, reject it'}
            </Btn>
          </div>
        </Card>
      )}
      {phase === 'done' && (
        <Card>
          {state.status === 'approved' ? 'Done. The review is now live on your site.' : 'Done. The review was rejected and stays hidden.'}
        </Card>
      )}
    </Wrap>
  );
}
