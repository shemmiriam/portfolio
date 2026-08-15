import React from 'react';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import { Link } from '../../styles/GlobalComponents';
import { SocialIcons } from '../Header/HeaderStyles';
import { CompanyContainer, FooterWrapper, LinkColumn, LinkItem, LinkList, LinkTitle, Slogan, SocialContainer, SocialIconsContainer } from './FooterStyles';
import { personalInfo } from '../../constants/constants';

const Footer = () => (
  <FooterWrapper>
    <LinkList>
      <LinkColumn>
        <LinkTitle>Email</LinkTitle>
        <LinkItem href={`mailto:${personalInfo.email}`}>{personalInfo.email}</LinkItem>
      </LinkColumn>
      <LinkColumn>
        <LinkTitle>GitHub</LinkTitle>
        <LinkItem href={personalInfo.github} target="_blank" rel="noopener noreferrer">shemmiriam</LinkItem>
      </LinkColumn>
    </LinkList>
    <SocialIconsContainer>
      <CompanyContainer>
        <Slogan>&copy; {new Date().getFullYear()} <Link href={personalInfo.github}>{personalInfo.name}</Link>. All rights reserved.</Slogan>
      </CompanyContainer>
      <SocialContainer>
        <SocialIcons href={personalInfo.github} target="_blank" rel="noopener noreferrer">
          <AiFillGithub size="3rem" />
        </SocialIcons>
        <SocialIcons href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
          <AiFillLinkedin size="3rem" />
        </SocialIcons>
      </SocialContainer>
    </SocialIconsContainer>
  </FooterWrapper>
);

export default Footer;
