import styled, { css } from 'styled-components';

interface ButtonInterface {
  small?: boolean;
  danger?: boolean;
}

export const SecondaryButton = styled.button<ButtonInterface>`
  color: ${({ theme }) => theme.colors.primary.main};
  text-decoration: none;
  font-weight: bold;
  border: 2px solid ${({ theme }) => theme.colors.primary.main};
  border-radius: 4px;
  transition: all 0.2s ease-in;
  margin: 0px 4px;
  padding: 8px 16px;

  ${({ small }) => small && css`
    height: 36px;
    padding: 0 8px;
    font-size: 14px;

    @media(max-width: 500px) {
      height: 48px;
    }
  `}

  &:hover {
    background: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.lighterBackground};
  }
`;
