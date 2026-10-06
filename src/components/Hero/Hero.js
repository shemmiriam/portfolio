import React from 'react';
import { Section, SectionText, SectionTitle, SecondaryBtn } from '../../styles/GlobalComponents';
import { HeroWrapper, ProfileSide, AvatarRing, AvatarImg, TextSide } from './HeroStyles';
import { heroData, personalInfo } from '../../constants/constants';

const Hero = () => (
  <Section row nopadding>
    <HeroWrapper>
      <ProfileSide>
        <AvatarRing>
          <AvatarImg src="/images/miriam-profile.jpg" alt={`${personalInfo.name}, ${personalInfo.title}`} />
        </AvatarRing>
      </ProfileSide>
      <TextSide>
        <SectionTitle as="h1" main style={{ paddingTop: '12px' }}>
          {heroData.greeting}
        </SectionTitle>
        <SectionText>
          {heroData.description}
        </SectionText>
        <SecondaryBtn
          as="a"
          href={personalInfo.resumeUrl}
          download="Miriam-Shem-CV.pdf"
          style={{ display: 'inline-block', marginBottom: 0 }}
        >
          {heroData.ctaSecondary}
        </SecondaryBtn>
      </TextSide>
    </HeroWrapper>
  </Section>
);

export default Hero;
