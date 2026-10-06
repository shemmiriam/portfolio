import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Section, SectionDivider, SectionTitle, SecondaryBtn } from '../../styles/GlobalComponents';

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  @media ${({ theme }) => theme.breakpoints.sm} {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    margin: 0 -16px;
    padding: 0 16px 1rem;
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
  }
`;

const Card = styled.figure`
  background: ${({ theme }) => theme.colors.background2};
  border-radius: 12px;
  padding: 2.4rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.6rem;
  @media ${({ theme }) => theme.breakpoints.sm} {
    flex: 0 0 85%;
    scroll-snap-align: center;
  }
`;

const Quote = styled.blockquote`
  margin: 0;
  font-size: 1.5rem;
  line-height: 1.7;
  color: #ddd;
  &::before { content: '\\201C'; color: ${({ theme }) => theme.colors.link}; font-size: 3rem; line-height: 0; margin-right: 0.3rem; vertical-align: -0.9rem; }
  &::after { content: '\\201D'; color: ${({ theme }) => theme.colors.link}; font-size: 3rem; line-height: 0; margin-left: 0.2rem; vertical-align: -0.9rem; }
`;

const Who = styled.figcaption`
  font-size: 1.3rem;
  color: #aaa;
  strong { display: block; color: #fff; font-size: 1.5rem; margin-bottom: 0.2rem; }
  a { color: ${({ theme }) => theme.colors.link}; }
`;

const Empty = styled.p`
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
`;

const Form = styled.form`
  background: ${({ theme }) => theme.colors.background2};
  border-radius: 12px;
  padding: 2.4rem;
  display: grid;
  gap: 1.4rem;
  max-width: 640px;
  width: 100%;
`;

const Field = styled.label`
  display: grid;
  gap: 0.5rem;
  font-size: 1.3rem;
  color: #ccc;
  input, textarea {
    font: inherit;
    font-size: 1.6rem; /* 16px+ stops iOS zooming on focus */
    padding: 1rem 1.2rem;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: ${({ theme }) => theme.colors.background1};
    color: #fff;
    width: 100%;
  }
  textarea { min-height: 130px; resize: vertical; }
`;

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.4rem;
  @media ${({ theme }) => theme.breakpoints.sm} { grid-template-columns: 1fr; }
`;

const Consent = styled.label`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  font-size: 1.3rem;
  color: #ccc;
  line-height: 1.5;
  input { margin-top: 0.3rem; width: 18px; height: 18px; flex-shrink: 0; }
`;

const Msg = styled.p`
  font-size: 1.4rem;
  color: ${({ $error, theme }) => ($error ? '#ff8a8a' : theme.colors.link)};
`;

// Visually hidden but still in the DOM, so bots fill it in
const Honeypot = styled.div`
  position: absolute;
  left: -9999px;
  height: 0;
  overflow: hidden;
`;

const empty = { name: '', role: '', company: '', linkedin: '', message: '', consent: false, website: '' };

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState({ type: '', text: '' });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetch('/api/reviews/')
      .then((r) => (r.ok ? r.json() : { reviews: [] }))
      .then((d) => setReviews(d.reviews || []))
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  const set = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus({ type: '', text: '' });
    try {
      const res = await fetch('/api/reviews/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not send your review.');
      setForm(empty);
      setOpen(false);
      setStatus({ type: 'ok', text: 'Thank you! Your review will appear here once it has been approved.' });
    } catch (err) {
      setStatus({ type: 'error', text: err.message });
    } finally {
      setSending(false);
    }
  };

  return (
    <Section id="reviews">
      <SectionDivider centered colorAlt />
      <SectionTitle>Reviews</SectionTitle>

      {reviews.length > 0 && (
        <Row>
          {reviews.map((r) => (
            <Card key={r.id}>
              <Quote>{r.message}</Quote>
              <Who>
                <strong>{r.name}</strong>
                {[r.role, r.company].filter(Boolean).join(', ')}
                {r.linkedin && (
                  <>
                    {' · '}
                    <a href={r.linkedin} target="_blank" rel="noopener noreferrer nofollow">LinkedIn</a>
                  </>
                )}
              </Who>
            </Card>
          ))}
        </Row>
      )}

      {loaded && reviews.length === 0 && (
        <Empty>Worked with me? I&apos;d love to hear how it went.</Empty>
      )}

      {status.type === 'ok' && <Msg role="status">{status.text}</Msg>}

      {open ? (
        <Form onSubmit={submit} style={{ marginTop: '2rem' }}>
          <Field>
            Your name *
            <input value={form.name} onChange={set('name')} maxLength={80} required autoComplete="name" />
          </Field>
          <TwoCol>
            <Field>
              Role
              <input value={form.role} onChange={set('role')} maxLength={100} autoComplete="organization-title" />
            </Field>
            <Field>
              Company / organisation
              <input value={form.company} onChange={set('company')} maxLength={100} autoComplete="organization" />
            </Field>
          </TwoCol>
          <Field>
            LinkedIn profile (optional)
            <input type="url" value={form.linkedin} onChange={set('linkedin')} maxLength={200} placeholder="https://linkedin.com/in/…" />
          </Field>
          <Field>
            Your review *
            <textarea value={form.message} onChange={set('message')} maxLength={600} minLength={20} required />
          </Field>
          <Honeypot aria-hidden="true">
            <label>Website<input tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} /></label>
          </Honeypot>
          <Consent>
            <input type="checkbox" checked={form.consent} onChange={set('consent')} required />
            I&apos;m happy for my name, role and review to be shown publicly on this site.
          </Consent>
          {status.type === 'error' && <Msg $error role="alert">{status.text}</Msg>}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <SecondaryBtn type="submit" disabled={sending} style={{ margin: 0 }}>
              {sending ? 'Sending…' : 'Submit review'}
            </SecondaryBtn>
            <SecondaryBtn type="button" onClick={() => setOpen(false)} style={{ margin: 0, border: 'none' }}>
              Cancel
            </SecondaryBtn>
          </div>
        </Form>
      ) : (
        <SecondaryBtn type="button" onClick={() => setOpen(true)} style={{ alignSelf: 'center' }}>
          Leave a Review
        </SecondaryBtn>
      )}
    </Section>
  );
};

export default Testimonials;
