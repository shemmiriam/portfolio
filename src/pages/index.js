import Head from 'next/head';
import Acomplishments from '../components/Acomplishments/Acomplishments';
import BgAnimation from '../components/BackgrooundAnimation/BackgroundAnimation';
import Hero from '../components/Hero/Hero';
import Projects from '../components/Projects/Projects';
import Technologies from '../components/Technologies/Technologies';
import Timeline from '../components/TimeLine/TimeLine';
import Experience from '../components/Experience/Experience';
import Certifications from '../components/Certifications/Certifications';
import { Layout } from '../layout/Layout';
import { Section } from '../styles/GlobalComponents';
import { personalInfo } from '../constants/constants';

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: personalInfo.name,
  jobTitle: personalInfo.title,
  url: 'https://portfolio-shemmmiriam.vercel.app/',
  image: 'https://portfolio-shemmmiriam.vercel.app/images/miriam-profile.jpg',
  email: `mailto:${personalInfo.email}`,
  sameAs: [personalInfo.github, personalInfo.linkedin, personalInfo.instagram].filter(Boolean),
  address: {
    '@type': 'PostalAddress',
    addressLocality: personalInfo.location,
  },
};

const Home = () => {
  return (
    <Layout>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </Head>
      <Section grid>
        <Hero />
        <BgAnimation />
      </Section>
      <Projects />
      <Experience />
      <Technologies />
      <Timeline />
      <Acomplishments />
      <Certifications />
    </Layout>
  );
};

export default Home;
