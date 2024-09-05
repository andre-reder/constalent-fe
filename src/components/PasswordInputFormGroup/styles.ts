import styled, { css } from 'styled-components';

interface IContainer {
  aside?: boolean;
  padding?: number;
}

export const Container = styled.div<IContainer>`
  width: 100%;

  & + & {
    margin-top: ${({ aside }) => aside ? 'unset' : '16px'};
  }

  > small {
    color: ${({ theme }) => theme.colors.danger.main};
    font-size: 12px;
    display: block;
    margin-top: 8px;
  }

  label {
    font-size: 12px;
    display: block;
    margin-bottom: 8px;
  }

  label.form-check-label {
    margin: 0;
  }

  span {
    font-size: 12px;
  }

  .form-item {
    position: relative;
  }

  .loader {
    position: absolute;
    top: 12px;
    right: 16px;
    img {
      width: 14px;
    }
  }

  .password {
    position: absolute;
    top: 33px;
    right: 16px;
    img {
      width: 18px;
      &:hover {
        cursor: pointer;
      }
    }
  }

  ${({ padding }) => padding && css`
    padding: ${padding}px;
  `}
`;
