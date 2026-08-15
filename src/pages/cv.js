import Head from 'next/head';
import styled, { createGlobalStyle } from 'styled-components';
import { personalInfo, experience, skills, certifications } from '../constants/constants';

const PrintStyle = createGlobalStyle`
  @media print {
    .no-print { display: none !important; }
    body { background: white !important; color: black !important; }
  }
`;

const Page = styled.div`
  max-width: 860px;
  margin: 0 auto;
  padding: 4rem 3rem;
  background: white;
  color: #111;
  font-family: 'Open Sans', sans-serif;
  font-size: 13px;
  line-height: 1.6;
  @media (max-width: 640px) { padding: 2rem 1.5rem; }
`;

const PrintBar = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-bottom: 2rem;
  @media print { display: none; }
`;

const Btn = styled.button`
  padding: 0.6rem 1.4rem;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  border: 1px solid #ddd;
  background: ${({ primary }) => primary ? '#0f1624' : 'white'};
  color: ${({ primary }) => primary ? 'white' : '#333'};
  &:hover { opacity: 0.85; }
`;

const Name = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #0f1624;
  margin: 0 0 0.3rem 0;
`;

const TitleLine = styled.p`
  font-size: 13px;
  color: #444;
  margin: 0 0 0.8rem 0;
`;

const ContactRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem 2rem;
  font-size: 12px;
  color: #555;
  margin-bottom: 0.3rem;
  a { color: #0066cc; text-decoration: none; }
`;

const Divider = styled.hr`
  border: none;
  border-top: 2px solid #0f1624;
  margin: 1.4rem 0 1rem 0;
`;

const ThinDivider = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  margin: 0.8rem 0;
`;

const SectionHeading = styled.h2`
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #0f1624;
  margin: 0 0 0.8rem 0;
`;

const JobTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.2rem;
`;

const Role = styled.h3`
  font-size: 13px;
  font-weight: 700;
  color: #111;
  margin: 0;
`;

const Period = styled.span`
  font-size: 12px;
  color: #666;
`;

const Company = styled.p`
  font-size: 12px;
  color: #444;
  margin: 0 0 0.5rem 0;
`;

const Ul = styled.ul`
  padding-left: 1.2rem;
  margin: 0.4rem 0 0 0;
  li { margin-bottom: 0.25rem; color: #333; }
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.5rem;
`;

const Tag = styled.span`
  background: #f0f0f0;
  color: #333;
  border-radius: 3px;
  padding: 0.15rem 0.5rem;
  font-size: 11px;
`;

const SkillGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem 2rem;
  @media (max-width: 640px) { grid-template-columns: 1fr 1fr; }
`;

const SkillCategory = styled.div``;
const SkillLabel = styled.p`
  font-weight: 700;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #555;
  margin: 0 0 0.2rem 0;
`;
const SkillList = styled.p`
  font-size: 12px;
  color: #333;
  margin: 0;
`;

const CertRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.4rem;
`;

const CertName = styled.span`
  font-size: 12px;
  color: #222;
`;

const CertStatus = styled.span`
  font-size: 11px;
  color: ${({ status }) =>
    status === 'Completed' ? '#1a7a3c' :
    status === 'In Progress' ? '#0066cc' : '#888'};
  font-weight: 600;
`;

export default function CV() {
  return (
    <>
      <Head>
        <title>CV — {personalInfo.name}</title>
      </Head>
      <PrintStyle />
      <Page>
        <PrintBar className="no-print">
          <Btn onClick={() => window.history.back()}>← Back to Portfolio</Btn>
          <Btn primary onClick={() => window.print()}>Print / Save as PDF</Btn>
        </PrintBar>

        {/* HEADER */}
        <Name>{personalInfo.name}</Name>
        <TitleLine>{personalInfo.title}</TitleLine>
        <ContactRow>
          <span>{personalInfo.location}</span>
          <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">github.com/shemmiriam</a>
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">linkedin.com/in/miriam-shem</a>
        </ContactRow>

        <Divider />

        {/* PROFILE */}
        <SectionHeading>Professional Profile</SectionHeading>
        <p style={{ color: '#333', margin: '0 0 0.5rem 0' }}>
          Software Engineer with professional experience across AI/ML systems, enterprise software, and government-facing integrations in East Africa. Built a production containerized AI pipeline (FastAPI, Celery, Redis, Docker, Whisper) for child protection organizations; contributed to an AI-powered KMS for a government energy organisation; engineered a multi-tenant corporate travel SaaS; and delivered enterprise billing and ERP integrations. Track record working with UNICEF, government ministries, and social-impact institutions. Advancing toward AI Product Leadership.
        </p>

        <Divider />

        {/* EXPERIENCE */}
        <SectionHeading>Work Experience</SectionHeading>
        {experience.map((job, i) => (
          <div key={job.id}>
            <JobTitle>
              <Role>{job.role}</Role>
              <Period>{job.period}</Period>
            </JobTitle>
            <Company>{job.company} · {job.location}</Company>
            <p style={{ fontSize: 12, color: '#333', margin: '0 0 0.3rem 0' }}>{job.description}</p>
            <Ul>
              {job.highlights.map((h, idx) => <li key={idx}>{h}</li>)}
            </Ul>
            <TagRow>
              {job.tags.map((t) => <Tag key={t}>{t}</Tag>)}
            </TagRow>
            {i < experience.length - 1 && <ThinDivider />}
          </div>
        ))}

        <Divider />

        {/* EDUCATION */}
        <SectionHeading>Education</SectionHeading>
        <JobTitle>
          <Role>Bachelor of Science — Computer Science</Role>
          <Period>2019 – 2023</Period>
        </JobTitle>
        <Company>Kabarak University, Nakuru, Kenya</Company>

        <Divider />

        {/* SKILLS */}
        <SectionHeading>Technical Skills</SectionHeading>
        <SkillGrid>
          <SkillCategory>
            <SkillLabel>Languages</SkillLabel>
            <SkillList>{skills.languages.map(s => s.name).join(', ')}</SkillList>
          </SkillCategory>
          <SkillCategory>
            <SkillLabel>Backend</SkillLabel>
            <SkillList>{skills.backend.map(s => s.name).join(', ')}</SkillList>
          </SkillCategory>
          <SkillCategory>
            <SkillLabel>Frontend</SkillLabel>
            <SkillList>{skills.frontend.map(s => s.name).join(', ')}</SkillList>
          </SkillCategory>
          <SkillCategory>
            <SkillLabel>AI / ML</SkillLabel>
            <SkillList>{skills.ai_ml.map(s => s.name).join(', ')}</SkillList>
          </SkillCategory>
          <SkillCategory>
            <SkillLabel>APIs & Integrations</SkillLabel>
            <SkillList>{skills.integrations.map(s => s.name).join(', ')}</SkillList>
          </SkillCategory>
          <SkillCategory>
            <SkillLabel>Tools & DevOps</SkillLabel>
            <SkillList>{skills.tools.map(s => s.name).join(', ')}</SkillList>
          </SkillCategory>
        </SkillGrid>

        <Divider />

        {/* CERTIFICATIONS */}
        <SectionHeading>Certifications & Professional Development</SectionHeading>
        {certifications.map((cert) => (
          <CertRow key={cert.id}>
            <CertName>
              {cert.name} — <span style={{ color: '#555' }}>{cert.provider} · {cert.platform}</span>
              {cert.completionDate && <span style={{ color: '#555' }}> · {cert.completionDate}</span>}
            </CertName>
            <CertStatus status={cert.status}>{cert.status}</CertStatus>
          </CertRow>
        ))}

        <Divider />

        {/* KEY PROJECTS */}
        <SectionHeading>Key Projects</SectionHeading>
        <Ul>
          <li><strong>OpenCHS (East Africa):</strong> AI-powered helpline & case management platform. Deployed in Tanzania, Uganda, Kenya, Lesotho. Clients include UNICEF Tanzania, UNICEF Kenya, Uganda MGLSD, C-Sema, CPIMS Kenya.</li>
          <li><strong>Uganda Ministry of Gender Integration:</strong> Django-based backend integration with the Uganda MGLSD gateway for child protection data exchange.</li>
          <li><strong>Kenya CPIMS Integration:</strong> Interoperability integration between OpenCHS and Kenya's national child protection registry (CPIMS).</li>
          <li><strong>Tanzania AI Capabilities:</strong> Speech-to-text (Whisper), translation (NLLB), summarization (FLAN-T5/Mistral) and classification for AI-enabled case processing.</li>
          <li><strong>D-HEIGHT DPI Initiative:</strong> Digital Public Infrastructure initiative covering housing, financial inclusion, WASH, and responsible AI. Confidential — research &amp; design phase.</li>
          <li><strong>KRA eTIMS Integration (Ruel Software):</strong> Enterprise ERP integration with Kenya Revenue Authority for tax invoice compliance.</li>
        </Ul>
      </Page>
    </>
  );
}
