import React from 'react';
import styled from 'styled-components';
import { Section, SectionDivider, SectionTitle, SecondaryBtn } from '../../styles/GlobalComponents';
import { experience } from '../../constants/constants';

const ExperienceCard = styled.div`
  background: ${({ theme }) => theme.colors.background2};
  border-radius: 12px;
  padding: 2.4rem;
  margin-bottom: 2rem;
`;

const RoleTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin: 0 0 0.4rem 0;
`;

const CompanyLine = styled.p`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.link};
  margin: 0 0 0.4rem 0;
`;

const Period = styled.p`
  font-size: 1.2rem;
  color: #888;
  margin: 0 0 1.2rem 0;
`;

const Description = styled.p`
  font-size: 1.4rem;
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 1.2rem;
`;

const HighlightList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1.2rem 0;
`;

const HighlightItem = styled.li`
  font-size: 1.3rem;
  color: #aaa;
  padding: 0.3rem 0 0.3rem 1.6rem;
  position: relative;
  &::before {
    content: '→';
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.link};
  }
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1rem;
`;

const Tag = styled.span`
  background: rgba(24, 197, 221, 0.1);
  color: ${({ theme }) => theme.colors.link};
  border: 1px solid rgba(24, 197, 221, 0.3);
  border-radius: 4px;
  padding: 0.3rem 0.8rem;
  font-size: 1.1rem;
`;

const Experience = () => (
  <Section id="experience">
    <SectionDivider centered colorAlt />
    <SectionTitle>Experience</SectionTitle>
    {experience.map((job) => (
      <ExperienceCard key={job.id}>
        <RoleTitle>{job.role}</RoleTitle>
        <CompanyLine>{job.company} · {job.location}</CompanyLine>
        <Period>{job.period}</Period>
        <Description>{job.description}</Description>
        <HighlightList>
          {job.highlights.map((h, i) => (
            <HighlightItem key={i}>{h}</HighlightItem>
          ))}
        </HighlightList>
        <TagRow>
          {job.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </TagRow>
      </ExperienceCard>
    ))}
    <SecondaryBtn as="a" href="/cv" style={{ alignSelf: 'center' }}>
      View Full Experience on CV
    </SecondaryBtn>
  </Section>
);

export default Experience;
