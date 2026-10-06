import styled from 'styled-components';

// Only rendered visually on phones and small tablets; desktop keeps the header navigation.
export const Nav = styled.nav`
  display: none;

  @media ${(props) => props.theme.breakpoints.nav} {
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
    justify-content: space-around;
    padding: 0.6rem 0.4rem calc(0.6rem + env(safe-area-inset-bottom, 0px));
    background: rgba(15, 22, 36, 0.96);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
`;

export const NavItem = styled.a`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  padding: 0.4rem 0;
  font-size: 1rem;
  letter-spacing: 0;
  color: ${({ $active, theme }) => ($active ? theme.colors.accent1 : 'rgba(255, 255, 255, 0.65)')};
  transition: color 0.2s ease;
  -webkit-tap-highlight-color: transparent;

  span {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:active {
    color: #fff;
  }
`;
