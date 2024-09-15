import styled from "styled-components";

export const InterviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px;
  max-height: 400px;
  overflow-y: auto;

  .group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    strong {
      font-size: 16px;
    }

    span {
      font-size: 14px;
    }
  }
`;
