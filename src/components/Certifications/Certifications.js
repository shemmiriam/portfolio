import React from 'react';
import styled from 'styled-components';
import { Section, SectionDivider, SectionTitle } from '../../styles/GlobalComponents';
import { certifications } from '../../constants/constants';

const CertGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const CertCard = styled.div`
  background: ${({ theme }) => theme.colors.background2};
  border-radius: 12px;
  padding: 2rem;
  border-left: 3px solid ${({ status, theme }) =>
    status === 'Completed' ? '#2ecc71' :
    status === 'In Progress' ? theme.colors.link :
    '#888'};
`;

const CertName = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  margin: 0 0 0.4rem 0;
`;

const Provider = styled.p`
  font-size: 1.2rem;
  color: #aaa;
  margin: 0 0 0.8rem 0;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.2rem 0.8rem;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 600;
  background: ${({ status }) =>
    status === 'Completed' ? 'rgba(46,204,113,0.15)' :
    status === 'In Progress' ? 'rgba(24,197,221,0.15)' :
    'rgba(136,136,136,0.15)'};
  color: ${({ status }) =>
    status === 'Completed' ? '#2ecc71' :
    status === 'In Progress' ? '#18C5DD' :
    '#888'};
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 1rem;
`;

const Tag = styled.span`
  font-size: 1rem;
  color: #aaa;
  background: rgba(255,255,255,0.05);
  border-radius: 3px;
  padding: 0.2rem 0.6rem;
`;

const Certifications = () => (
  <Section id="certifications">
    <SectionDivider centered />
    <SectionTitle>Certifications</SectionTitle>
    <CertGrid>
      {certifications.map((cert) => (
        <CertCard key={cert.id} status={cert.status}>
          <CertName>{cert.name}</CertName>
          <Provider>{cert.provider} · {cert.platform}</Provider>
          <StatusBadge status={cert.status}>{cert.status}</StatusBadge>
          {cert.completionDate && <p style={{ fontSize: '1.1rem', color: '#888', marginTop: '0.5rem' }}>Completed: {cert.completionDate}</p>}
          <TagRow>
            {cert.skills.map((s) => <Tag key={s}>{s}</Tag>)}
          </TagRow>
        </CertCard>
      ))}
    </CertGrid>
  </Section>
);

export default Certifications;
