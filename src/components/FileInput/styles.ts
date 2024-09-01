import styled from 'styled-components';

export const StepsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 16px 0px 4px;

  img {
    margin: 0 40px;
  }
`;

export const FileInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  `;

export const ChosenFileContainer = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.colors.lighterBackground};
  box-shadow: 8px 4px 10px rgba(0, 0, 0, 0.04);
  padding: 6px;
  border-radius: 4px;
  margin-top: 12px;
  margin-bottom: 16px;

  .fileSmall {
    font-size: 12px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
`;
