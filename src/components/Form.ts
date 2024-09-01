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
