import styled from 'styled-components';

export const Container = styled.div`
max-width: 1280px;
width: 100%;
margin: auto;

@media ${(props) => props.theme.breakpoints.sm} {
  padding-bottom: calc(72px + env(safe-area-inset-bottom, 0px));
}
`;
