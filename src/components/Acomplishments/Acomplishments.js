import React from 'react';
import { Section } from '../../styles/GlobalComponents';
import { Box, Boxes, BoxNum, BoxText } from './AcomplishmentsStyles';
import { accomplishments } from '../../constants/constants';

const Acomplishments = () => (
  <Section style={{ paddingTop: 0 }}>
    <Boxes>
      {accomplishments.map((item, index) => (
        <Box key={index}>
          <BoxNum>{`${item.number.toLocaleString()}+`}</BoxNum>
          <BoxText>{item.text}</BoxText>
        </Box>
      ))}
    </Boxes>
  </Section>
);

export default Acomplishments;
