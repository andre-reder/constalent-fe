import styled from 'styled-components';

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;

  @media(max-width: 900px) {
    justify-content: center;
    align-items: center;
  }

  position: relative;
  top: 25%;
  transform: translateY(15%);
  margin: 0 3em;
  background: ${({ theme }) => theme.colors.lighterBackground};
  box-shadow: 8px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 10px;

  div.asideGif {
    @media(max-width: 900px) {
      display: none;
    }
    width: 40%;
    img {
      width: 100%;
      border-radius: 10px 0px 0px 10px;
    }
  }

  div.asideLogin {
    margin: 2em 3em;
    width: 60%;
    @media(max-width: 900px) {
      margin: 1.5em;
      width: 90%;
    }

    .loginTitle {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2.5em;
      @media(max-width: 900px) {
        flex-direction: column-reverse;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 0em !important;
      }
      img {
        width: 10%;
        @media(max-width: 900px) {
          margin-bottom: 1em !important;
          width: 40%;
        }
      }
      .labelTitle {
        display: flex;
        flex-direction: column;
        div {
          font-size: 24px;
          font-weight: bold;
          @media(max-width: 500px) {
            font-size: 16px;
          }
        }
        .subtitle {
          font-size: 16px;
          font-weight: normal;
          @media(max-width: 500px) {
            font-size: 12px;
          }
        }
      }
    }

    .loginForm {
      /* margin-top: 4.5em;
      margin-bottom: 4em; */
      button.googleButton {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 8px;
        padding: 8px;
        border: ${({ theme }) => `1px solid ${theme.colors.primary}`};
        margin-bottom: 16px;
        margin-left: 0px;

        img {
          width: 16px;
          padding: 0px;
        }
      }

      .loginInput {
        margin-bottom: 20px;
      }
    }

    .forgotPassword {
      text-align: center;
      text-decoration: underline;
      margin-top: 16px;

      a {
        &:hover{
        opacity: 0.5;
        transition: ease-in 0.2s;
      }
      &:not(:hover) {
        opacity: 1;
        transition: ease-in 0.2s;
      }
      }
    }
  }

`;
