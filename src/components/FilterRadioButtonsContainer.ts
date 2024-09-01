import styled from 'styled-components';

interface FilterRadioButtonsContainerInterface {
  flexDirection?: string;
}

export const FilterRadioButtonsContainer = styled.div<FilterRadioButtonsContainerInterface>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 4px;
  margin-bottom: 4px;

  @media(max-width: 500px) {
    display: flex;
    flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
    gap: 6px;
  }
`;
