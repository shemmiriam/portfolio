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
          <AvatarImg src="/images/miriam-profile.png" alt={personalInfo.name} />
        </AvatarRing>
      </ProfileSide>
      <TextSide>
        <SectionTitle main>
          {heroData.greeting}
        </SectionTitle>
        <SectionText>
          {heroData.description}
        </SectionText>
        <Button onClick={(e) => {
          e.preventDefault();
          window.location.href = '/cv';
        }}>
          {heroData.ctaSecondary}
        </Button>
      </TextSide>
    </HeroWrapper>
  </Section>
);

export default Hero;
