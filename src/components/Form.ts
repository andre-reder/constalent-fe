import styled from 'styled-components';

interface FilterRadioButtonsContainerInterface {
  flexDirection?: string;
}

export const Form = styled.form`
  width: 100%;
  background: ${({ theme }) => theme.colors.lighterBackground};
  box-shadow: 8px 4px 10px rgba(0, 0, 0, 0.04);
  padding: 16px;
  border-radius: 4px;
`;

export const ButtonContainer = styled.div<FilterRadioButtonsContainerInterface>`
  margin-top: 24px;
  display: flex;
  flex-direction: ${({ flexDirection }) => (flexDirection || 'row')};
  justify-content: center;
  align-items: center;
  gap: ${({ flexDirection }) => (flexDirection ? '0px' : '16px')};

  button {
    width: 100%;
  }
`;

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.lighterBackground};
  box-shadow: 8px 4px 10px rgba(0, 0, 0, 0.04);
  padding: 16px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;

  div.card-title {
    font-weight: bold;
    font-size: 24px;
    margin-top: -8px;
    margin-left: -4px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    div {
      font-weight: bold;
      font-size: 24px;
    }

    div.actions {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      gap: 8px;
    }

    img {
      width: 24px;
      transition: all 0.2s ease-in-out;
      cursor: pointer;
      filter: ${({ theme }) => theme.filters.primary};
      &:hover {
        opacity: 0.7
      }
    }
  }
`;

export const AsideContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;

  > div {
    & + div {
      margin-left: 16px;
    }
  }

  & + & {
    margin-top: 16px;
  }
`;
