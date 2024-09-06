import styled from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const RoutesContainer = styled.div`
  padding: 32px;
  padding-left: 140px;
  width: 100%;
`;

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`;

export const RouteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media(max-width: 500px){
    margin: 2em;
  }
`;

export const ThemeRadioButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-top: 16px;
  padding-right: 24px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1000;

  @media(max-width: 500px) {
    display: flex;
  }
`;

