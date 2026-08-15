import React from 'react';
import { Section, SectionDivider, SectionTitle } from '../../styles/GlobalComponents';
import { Box, Boxes, BoxNum, BoxText } from './AcomplishmentsStyles';
import { accomplishments } from '../../constants/constants';

const Acomplishments = () => (
  <Section>
    <SectionTitle>By the Numbers</SectionTitle>
    <Boxes>
      {accomplishments.map((item, index) => (
        <Box key={index}>
          <BoxNum>{`${item.number.toLocaleString()}+`}</BoxNum>
          <BoxText>{item.text}</BoxText>
        </Box>
      ))}
    </Boxes>
    <SectionDivider />
  </Section>
);

export default Acomplishments;
