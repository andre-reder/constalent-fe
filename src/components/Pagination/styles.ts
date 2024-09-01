import styled from 'styled-components';

interface SecondaryButtonInterface {
  selected?: boolean;
}

export const PaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 415px;
  overflow-x: scroll;

  @media(max-width: 500px) {
    max-width: 319px;
  }
`;

export const SecondaryButton = styled.button<SecondaryButtonInterface>`
      color: ${({ theme, selected }) => (selected ? theme.colors.lighterBackground : theme.colors.primary.main)} !important;
      background: ${({ theme, selected }) => (selected ? theme.colors.primary.main : theme.colors.background)} !important;
      text-decoration: none !important;
      font-weight: bold !important;
      border: 1px solid ${({ theme }) => theme.colors.primary.main} !important;
      padding: 2px !important;
      border-radius: 4px !important;
      transition: all 0.2s ease-in !important;
      font-size: 12px !important;
      height: 24px !important;
      width: fit-content !important;
      min-width: 28px !important;
      margin-top: 4px;
      margin-bottom: 6px;
      & + & {
        margin-left: 4px !important;
      }

      @media(max-width: 500px) {
        font-size: 9px !important;
        height: 20px !important;
        padding: 1px 2px !important;
  }

      &:hover {
        background: ${({ theme, selected }) => (!selected && theme.colors.primary.main)} !important;
        color: ${({ theme }) => (theme.colors.lighterBackground)} !important;
      }

      &[disabled] {
        cursor: default !important;
      }
`;
