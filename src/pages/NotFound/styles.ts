import styled from 'styled-components';

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 0 3em;

  img {
    width: 30%;
  }

  div {
    font-size: 18px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    a {
      strong {
        font-size: 19px;
        &:hover{
          opacity: 0.5;
          transition: ease-in 0.2s;
        }
        &:not(:hover) {
          opacity: 1;
          transition: ease-in 0.2s;
        }
      }
      background: transparent;
    }
  }
`;
