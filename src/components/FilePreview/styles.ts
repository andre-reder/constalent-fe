import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 8px;

  img.file {
    width: inherit;
    margin: 15px;
  }

  video {
    width: inherit;
    margin: 15px;
  }
`;
