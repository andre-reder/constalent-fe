import styled from 'styled-components';

interface FormGroupProps {
  isAside?: boolean;
  marginTop?: number;
}

export const Container = styled.div<FormGroupProps>`
  width: 100%;
  margin-top: ${({ marginTop }) => marginTop ? `${marginTop}px` : '0px'};

  /* & + & {
    margin-top: ${({ isAside }) => (isAside ? '0' : '16px')};
  } */


  small {
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
    top: 38px;
    right: 16px;
  }
`;
