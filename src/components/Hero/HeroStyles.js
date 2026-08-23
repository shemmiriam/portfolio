import styled from 'styled-components';

export const LeftSection = styled.div`
  width: 100%;
  @media ${(props) => props.theme.breakpoints.sm} {
    width: 80%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }
  @media ${(props) => props.theme.breakpoints.md} {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }
`;

export const HeroWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3.5rem;
  width: 100%;
  padding: 0.5rem 0 1.5rem;
  @media ${(props) => props.theme.breakpoints.md} {
    gap: 2rem;
  }
  @media ${(props) => props.theme.breakpoints.sm} {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    padding: 0.5rem 0 1rem;
  }
`;

export const ProfileSide = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AvatarRing = styled.div`
  background: linear-gradient(
    135deg,
    #f09433 0%,
    #e6683c 25%,
    #dc2743 50%,
    #cc2366 75%,
    #bc1888 100%
  );
  border-radius: 50%;
  padding: 3px;
  width: 210px;
  height: 210px;
  flex-shrink: 0;
  box-shadow: 0 0 24px rgba(220, 39, 67, 0.35);
  @media ${(props) => props.theme.breakpoints.md} {
    width: 175px;
    height: 175px;
  }
  @media ${(props) => props.theme.breakpoints.sm} {
    width: 140px;
    height: 140px;
  }
`;

export const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  object-position: 50% 12%;
  filter: brightness(1.08) contrast(1.06) saturate(1.12);
  border: 3px solid #0f1624;
  display: block;
`;

export const TextSide = styled.div`
  flex: 1;
  min-width: 0;
`;
