import React from "react";
import { Section, SectionDivider, SectionTitle, } from "../../styles/GlobalComponents";
import { List, ListContainer, ListItem, ListParagraph, ListTitle, } from "./TechnologiesStyles";
import { Skills } from './Skills'
import GitHubLanguages from '../GitHubLanguages/GitHubLanguages'

const Technologies = () => (
  <Section id="skills">
    <SectionDivider centered />
    <SectionTitle>Skills</SectionTitle>
    <List>
      {Skills.map((Skill) => (
        <ListItem key={Skill.slug}>
          <picture>
            <Skill.Component size="3rem" />
          </picture>
          <ListContainer>
            <ListTitle>{Skill.title}</ListTitle>
            <ListParagraph>
              <Skill.Description />
            </ListParagraph>
          </ListContainer>
        </ListItem>
      ))}
    </List>
    <GitHubLanguages />
  </Section>
);

export default Technologies;
