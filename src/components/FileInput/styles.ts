import styled from 'styled-components';


interface IStepsContainer {
  justifyContent: string;
}

export const StepsContainer = styled.div<IStepsContainer>`
  display: flex;
  flex-direction: row;
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: center;
  margin: 16px 0px 4px;
  gap: 16px;

  img {
    margin: 0 40px;
  }
`;

export const FileInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
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
  align-items: flex-start;
  justify-content: flex-start;
  gap: 8px;

  button {
    word-break: keep-all !important;
    flex-wrap: nowrap !important;
    white-space: nowrap !important;
    text-overflow: ellipsis !important;
    overflow: hidden !important;
  }
`;
