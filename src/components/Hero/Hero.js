import React from 'react';
import { Section, SectionText, SectionTitle } from '../../styles/GlobalComponents';
import Button from '../../styles/GlobalComponents/Button';
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
        <Button href={personalInfo.resumeUrl} download>
          {heroData.ctaSecondary}
        </Button>
      </TextSide>
    </HeroWrapper>
  </Section>
);

export default Hero;
