import React from 'react';
import { Link } from '../../styles/GlobalComponents';
import { CompanyContainer, FooterWrapper, Slogan, SocialIconsContainer } from './FooterStyles';
import { personalInfo } from '../../constants/constants';

const Footer = () => (
  <FooterWrapper>
    <SocialIconsContainer>
      <CompanyContainer>
        <Slogan>&copy; {new Date().getFullYear()} <Link href={`mailto:${personalInfo.email}`}>{personalInfo.name}</Link>. Coded with lots of coffee.</Slogan>
      </CompanyContainer>
    </SocialIconsContainer>
  </FooterWrapper>
);

export default Footer;
