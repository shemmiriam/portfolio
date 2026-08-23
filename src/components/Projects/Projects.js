import React from 'react';

import { BlogCard, CardInfo, ExternalLinks, GridContainer, HeaderThree, Hr, Tag, TagList, TitleContent, UtilityList, Img, ImgWrap } from './ProjectsStyles';
import { Section, SectionDivider, SectionTitle } from '../../styles/GlobalComponents';
import { projects } from '../../constants/constants';

const Projects = () => (
  <Section id="projects">
    <SectionDivider centered />
    <SectionTitle main>Projects</SectionTitle>
    <GridContainer>
      {projects.map((p, i) => {
        return (
          <BlogCard key={i}>
            <ImgWrap>
              <Img src={p.image} alt={p.title} />
            </ImgWrap>

            <HeaderThree title={p.title}>{p.title}</HeaderThree>
            <Hr />

            <CardInfo className="card-info">{p.description}</CardInfo>
            <div>
              <TitleContent>Tech Stack</TitleContent>
              <Hr />
              <TagList>
                {p.tags.map((t, i) => {
                  return <Tag key={i}>{t}</Tag>;
                })}
              </TagList>
            </div>
            <UtilityList>
              {p.visit && p.visit !== '#' && p.visit !== p.source && (
                <ExternalLinks href={p.visit} target="_blank" rel="noopener noreferrer">Live Preview</ExternalLinks>
              )}
              {p.source && p.source !== '#' ? (
                <ExternalLinks href={p.source} target="_blank" rel="noopener noreferrer">Source Code</ExternalLinks>
              ) : (
                <span style={{color: '#888', fontSize: '1.4rem', padding: '0.6rem 1rem', border: '1px solid #444', borderRadius: '15px'}}>Confidential</span>
              )}
            </UtilityList>
          </BlogCard>
        );
      })}
    </GridContainer>
  </Section>
);

export default Projects;