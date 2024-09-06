import styled from 'styled-components';

interface NavItemProps {
  active: boolean
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.colors.lighterBackground};
  padding: 20px 0px 0px;
  gap: 8px;
  width: 108px;
  height: 100vh;
  position: fixed;
  box-shadow: 10px 0px 32px rgba(204, 204, 204, 0.1);
`;

export const LogoText = styled.div`
  font-size: 24px;
  display: inline-block;
  strong {
    font-weight: bold;
  }
  span {
    font-weight: 400;
  }
`;

export const NavItemsContainer = styled.div`
  max-height: 70vh;
  overflow: auto;
  box-sizing: border-box;
  width: 100%;
`;

export const NavItem = styled.div<NavItemProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  gap: 8px;
  font-size: 12px;
  /* border: ${({ active }) => active && '1.5px solid #D73035'}; */
  color: ${({ active }) => active && '#D73035'};
  border-bottom-width: 12px;
  &:hover {
    opacity: 0.7;
  }

  transition: all 0.2s ease-in-out;

  strong {
    margin-top: -12px;
  }

  img {
    filter: ${({ theme }) => theme.filters.oppositeTheme};
  }
`;

export const EndingElements = styled.div`
  margin-top: 12px;
`;
