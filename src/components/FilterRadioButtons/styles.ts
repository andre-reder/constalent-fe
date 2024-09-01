import styled, { css } from 'styled-components';
import { FilterRadioButtonInterface } from './interface';

export const SecondaryButton = styled.button<FilterRadioButtonInterface>`
      color: ${({ theme, selected }) => (selected ? theme.colors.lighterBackground : theme.colors.primary.main)};
      background: ${({ theme, selected }) => (selected ? theme.colors.primary.main : theme.colors.background)};
      text-decoration: none;
      font-weight: bold;
      border: 2px solid ${({ theme }) => theme.colors.primary.main};
      padding: 4px 8px;
      border-radius: 16px;
      transition: all 0.2s ease-in;
      font-size: ${({ smallText }) => smallText ? '11px' : '14px'}!important;
      height: 36px;
      margin: 1px;
      display: ${({ invisible }) => invisible && 'none'}!important;

      @media(max-width: 500px) {
        font-size: 11px;
        height: 44px;
        padding: 0px 8px;

        ${({ sameWidth }) => sameWidth && css`
          min-width: 200px;
        `};

        ${({ nowrap }) => nowrap && css`
          white-space: nowrap;
        `};
        /* min-width: 200px; */
      }

      & + & {
        margin-left: 8px;
      }
      @media(max-width: 500px){
        & + & {
          margin-left: 0px;
        }
      }

      &:hover {
        background: ${({ theme, selected }) => (!selected && theme.colors.primary.main)};
        color: ${({ theme }) => (theme.colors.lighterBackground)};
      }

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        &:hover {}
      }
`;
