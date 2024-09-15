import { createGlobalStyle, css } from 'styled-components';

import GeneralSansMediumTtf from '../fonts/GeneralSans-Medium.ttf';
import GeneralSansMediumWoff from '../fonts/GeneralSans-Medium.woff';
import GeneralSansMediumWoff2 from '../fonts/GeneralSans-Medium.woff2';
import GeneralSansRegularTtf from '../fonts/GeneralSans-Regular.ttf';
import GeneralSansRegularWoff from '../fonts/GeneralSans-Regular.woff';
import GeneralSansRegularWoff2 from '../fonts/GeneralSans-Regular.woff2';
import GeneralSansSemiboldTtf from '../fonts/GeneralSans-Semibold.ttf';
import GeneralSansSemiboldWoff from '../fonts/GeneralSans-Semibold.woff';
import GeneralSansSemiboldWoff2 from '../fonts/GeneralSans-Semibold.woff2';

interface GlobalStyleInterface {
  error?: boolean;
  selected?: boolean;
}

export const GlobalStyles = createGlobalStyle<GlobalStyleInterface>`
@font-face {
    font-family: 'GeneralSans';
    font-weight: 400;
    font-display: 'swap';
    font-style: 'normal';
    src: url('${GeneralSansRegularWoff2}') format('woff2'),
          url('${GeneralSansRegularWoff}') format('woff'),
          url('${GeneralSansRegularTtf}') format('truetype');
  }
  @font-face {
    font-family: 'GeneralSans';
    font-weight: 500;
    font-display: 'swap';
    font-style: 'normal';
    src: url('${GeneralSansMediumWoff2}') format('woff2'),
          url('${GeneralSansMediumWoff}') format('woff'),
          url('${GeneralSansMediumTtf}') format('truetype');
  }
  @font-face {
    font-family: 'GeneralSans';
    font-weight: 600;
    font-display: 'swap';
    font-style: 'normal';
    src: url('${GeneralSansSemiboldWoff2}') format('woff2'),
          url('${GeneralSansSemiboldWoff}') format('woff'),
          url('${GeneralSansSemiboldTtf}') format('truetype');
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: GeneralSans, sans-serif;
  }
  input[type=date] {
      color: ${({ theme, selected }) => (selected ? theme.colors.lighterBackground : theme.colors.primary.main)};
      background: ${({ theme }) => (theme.colors.lighterBackground)};
      color-scheme: ${({ theme }) => theme.colors.background === '#121212' && 'dark'};
      text-decoration: none;
      font-weight: bold;
      border: 2px solid ${({ theme }) => theme.colors.primary.main};
      padding: 4px 8px;
      border-radius: 8px;
      transition: all 0.2s ease-in;
      font-size: 16px;
      height: 40px;
      width: 100%;

      @media(max-width: 500px) {
        font-size: 12px;
        height: 30px;
        padding: 2px 4px;
      }

      &:focus {
        border-color: ${({ theme }) => theme.colors.primary.main};
        color: ${({ theme }) => theme.colors.gray[900]};
      }
  }

  img.primaryColor {
    filter: ${({ theme }) => theme.filters.primary};
  }

  img.oppositeTheme {
    filter: ${({ theme }) => theme.filters.oppositeTheme};
  }

  img.sameAsTheme {
    filter: ${({ theme }) => theme.filters.sameAsTheme};
  }

  img.logo {
    filter: ${({ theme }) => ((theme.colors.background === '#F6F5FC')
    && 'invert(0%) sepia(7%) saturate(7500%) hue-rotate(331deg) brightness(105%) contrast(105%)')};
    filter: ${({ theme }) => ((theme.colors.background === '#121212')
    && 'invert(100%) sepia(0%) saturate(25%) hue-rotate(50deg) brightness(105%) contrast(106%)')};
    margin-right: 4px;
  }

  a {
        text-decoration: none;
        background: ${({ theme }) => theme.colors.lighterBackground};
        color: ${({ theme }) => theme.colors.gray[900]};
        &:hover {
          color: ${({ theme }) => theme.colors.gray[900]}
        }
      }

  body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.gray[900]};
    transition: background-color .3s;
  }

  button {
    cursor: pointer;
  }

  aside {
    background: ${({ theme }) => theme.colors.lighterBackground};
  }

  ul {
    background: ${({ theme }) => theme.colors.lighterBackground};
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  li {
    background: ${({ theme }) => theme.colors.lighterBackground};
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  input {
    border-color: ${({ theme }) => theme.colors.defaultBorder} !important;
    &:hover {
      border-color: ${({ theme }) => theme.colors.darkerBackground} !important;
    }
    &:focus {
      border-color: ${({ theme }) => theme.colors.primary.main} !important;
      ${({ theme, error }) => error && css`
    color: ${theme.colors.danger.main};
    border-color: ${theme.colors.danger.main} !important;
  `};
    }
    ${({ theme, error }) => error && css`
    color: ${theme.colors.danger.main} !important;
    border-color: ${theme.colors.danger.main} !important;
  `};
  }

  div.react-select-container {
    border-color: ${({ theme }) => theme.colors.defaultBorder} !important;
    color: ${({ theme }) => theme.colors.gray[900]} !important;
    &:hover {
      border-color: ${({ theme }) => theme.colors.darkerBackground} !important;
    }
    &:focus {
      border-color: ${({ theme }) => theme.colors.primary.main} !important;
    }
    div.react-select__control {
      border-color: ${({ theme }) => theme.colors.defaultBorder} !important;
      color: ${({ theme }) => theme.colors.gray[900]} !important;
      background: none;
    &:hover {
      border-color: ${({ theme }) => theme.colors.darkerBackground} !important;
    }
    &:focus {
      border-color: ${({ theme }) => theme.colors.primary.main} !important;
    }
    div.react-select__value-container div.react-select__value-container div.react-select__value-container--is-multi div.react-select__value-container--has-value{
      border-color: ${({ theme }) => theme.colors.defaultBorder} !important;
    &:hover {
      border-color: ${({ theme }) => theme.colors.darkerBackground} !important;
    }
    &:focus {
      border-color: ${({ theme }) => theme.colors.primary.main} !important;
    }
      div {
        div.react-select__multi-value {
          background: ${({ theme }) => theme.colors.darkerBackground} !important;
          div.react-select__multi-value__label {
            color: ${({ theme }) => theme.colors.gray[900]};
          }
        }
      }
      div.react-select__single-value{
        color: ${({ theme }) => theme.colors.gray[900]} !important;
      }
      div.react-select__input-container{
        color: ${({ theme }) => theme.colors.gray[900]} !important;
      }
    }
    }
    div.react-select__menu{
      border-color: ${({ theme }) => theme.colors.defaultBorder} !important;
    &:hover {
      border-color: ${({ theme }) => theme.colors.darkerBackground} !important;
    }
    &:focus {
      border-color: ${({ theme }) => theme.colors.primary.main} !important;
    }
    div.react-select__menu-list {
      border-color: ${({ theme }) => theme.colors.defaultBorder} !important;
      background: ${({ theme }) => theme.colors.background} !important;;
    &:hover {
      border-color: ${({ theme }) => theme.colors.darkerBackground} !important;
    }
    &:focus {
      border-color: ${({ theme }) => theme.colors.primary.main} !important;
    }
    div.react-select__option{
      border-color: ${({ theme }) => theme.colors.defaultBorder} !important;
      color: ${({ theme }) => theme.colors.primary.main} !important;
    &:hover {
      border-color: ${({ theme }) => theme.colors.darkerBackground} !important;
    }
    &:focus {
      border-color: ${({ theme }) => theme.colors.primary.main} !important;
    }
    }
    }
    }
  }

  div.react-select-container-as-filter {
    border-color: ${({ theme }) => theme.colors.defaultBorder} !important;
    color: ${({ theme }) => theme.colors.gray[900]} !important;
    background: ${({ theme }) => theme.colors.lighterBackground};
    border-radius: 16px;
    width: 250px;
    &:hover {
      border-color: ${({ theme }) => theme.colors.darkerBackground} !important;
    }
    &:focus {
      border-color: ${({ theme }) => theme.colors.primary.main} !important;
    }
    div.react-select__control {
      border-color: ${({ theme }) => theme.colors.defaultBorder} !important;
      color: ${({ theme }) => theme.colors.gray[900]} !important;
      background: none;
      border-radius: 16px;
    &:hover {
      border-color: ${({ theme }) => theme.colors.darkerBackground} !important;
    }
    &:focus {
      border-color: ${({ theme }) => theme.colors.primary.main} !important;
    }
    div.react-select__value-container div.react-select__value-container div.react-select__value-container--is-multi div.react-select__value-container--has-value{
      border-color: ${({ theme }) => theme.colors.defaultBorder} !important;
    &:hover {
      border-color: ${({ theme }) => theme.colors.darkerBackground} !important;
    }
    &:focus {
      border-color: ${({ theme }) => theme.colors.primary.main} !important;
    }
      div {
        div.react-select__multi-value {
          background: ${({ theme }) => theme.colors.darkerBackground} !important;
          div.react-select__multi-value__label {
            color: ${({ theme }) => theme.colors.gray[900]};
          }
        }
      }
      div.react-select__single-value{
        color: ${({ theme }) => theme.colors.gray[900]} !important;
      }
      div.react-select__input-container{
        color: ${({ theme }) => theme.colors.gray[900]} !important;
      }
    }
    }
    div.react-select__menu{
      border-color: ${({ theme }) => theme.colors.defaultBorder} !important;
    &:hover {
      border-color: ${({ theme }) => theme.colors.darkerBackground} !important;
    }
    &:focus {
      border-color: ${({ theme }) => theme.colors.primary.main} !important;
    }
    div.react-select__menu-list {
      border-color: ${({ theme }) => theme.colors.defaultBorder} !important;
      background: ${({ theme }) => theme.colors.background} !important;;
    &:hover {
      border-color: ${({ theme }) => theme.colors.darkerBackground} !important;
    }
    &:focus {
      border-color: ${({ theme }) => theme.colors.primary.main} !important;
    }
    div.react-select__option{
      border-color: ${({ theme }) => theme.colors.defaultBorder} !important;
      color: ${({ theme }) => theme.colors.primary.main} !important;
    &:hover {
      border-color: ${({ theme }) => theme.colors.darkerBackground} !important;
    }
    &:focus {
      border-color: ${({ theme }) => theme.colors.primary.main} !important;
    }
    }
    }
    }
  }

  .accordion-button {
    background: ${({ theme }) => theme.colors.lighterBackground};
    border: none;
    box-shadow: none;
    padding: none;
    color: ${({ theme }) => theme.colors.gray[900]};
    display: flex;
    align-items: center;
    cursor: pointer;
    margin: 0px 8px;

    &::after {
      display: none;
    }

    &:hover {
      background: ${({ theme }) => theme.colors.background} !important;
      transition: ease-in-out 0.4s;
      margin: 0px 1px;
    }

    &:focus {
      background: ${({ theme }) => theme.colors.lighterBackground} !important;
      border: none;
      box-shadow: none;
      box-shadow: none;
      color: ${({ theme }) => theme.colors.primary.main} !important;

      img {
        filter: invert(25%) sepia(98%) saturate(1729%) hue-rotate(197deg) brightness(102%) contrast(103%);
      }
    }

    &:not(:focus) {
      background: ${({ theme }) => theme.colors.lighterBackground} !important;
      border: none;
      box-shadow: none;
    }

    &:not(.collapsed){
      background: ${({ theme }) => theme.colors.lighterBackground};
      color: ${({ theme }) => theme.colors.primary.main};
      border: none;
      box-shadow: none;
      img {
        filter: invert(25%) sepia(98%) saturate(1729%) hue-rotate(197deg) brightness(102%) contrast(103%);
      }
    }
  }

  .accordion-item {
    background: ${({ theme }) => theme.colors.lighterBackground};
    color: ${({ theme }) => theme.colors.gray[900]};
    border: none;
    box-shadow: none;
  }

  .accordion-body {
    background: ${({ theme }) => theme.colors.lighterBackground};
    padding: 0;
    padding-left: 0.5em;
    border: none;
    box-shadow: none;
  }

  .accordion-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

    button {
      margin: 0;
      padding: 0;
    }
  }

  .col {
      margin-top: 0.5em;
      padding: 0.5em;
  }

  .menuButton {
    position: fixed;
    width: 50px;
    top: 0;
    left: 0;
    z-index: 11;
  }

  .timeInput {
  width: 100%;
  background: none;
  color: ${({ theme }) => theme.colors.gray[900]};
  border: 1px solid hsl(0deg 0% 80%);
  box-shadow: 8px 4px 10px rgba(0, 0, 0, 0.04);
  height: 39px;
  border-radius: 4px;
  outline: none;
  padding: 0 12px;
  transition: border-color 0.2s ease-in;
  appearance: none;

  &:focus {
  border-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.gray[900]};
  ${({ theme, error }) => error && css`
    color: ${theme.colors.danger.main} !important;
    border-color: ${theme.colors.danger.main} !important;
  `};
  }

  &[disabled] {
    // background: ${({ theme }) => theme.colors.background};
    cursor: default;
    color: ${({ theme }) => theme.colors.gray[900]};
    opacity: 0.5;
  }

  ${({ theme, error }) => error && css`
    color: ${theme.colors.danger.main};
    border-color: ${theme.colors.danger.main} !important;
  `};

  .offcanvas{
    background-color: ${({ theme }) => theme.colors.lighterBackground} !important;
  }

  }

  div.darkMode {
    display: flex;
    flex-direction: row;
    width: fit-content;
    max-width: 100%;
    align-items: center;
    justify-content: flex-end;
    margin: 0;
    margin-bottom: -30px;
    margin-left: 90%;
    z-index: 10;

    @media(max-width: 500px){
    margin-bottom: 0;
    width: 100%;
    margin-left: 0;
  }
}

  div.darkModeAtLoginPage {
    display: flex;
    flex-direction: row;
    width: fit-content;
    align-items: center;
    justify-content: flex-end;
    margin: 0;
    margin-bottom: -40px;
    margin-top: 25px;
    margin-left: 87%;
    z-index: 10;

    @media(max-width: 500px){
    margin-bottom: -40px;
    width: 100%;
    margin-left: 0;
    margin-right: 45px;
  }
  }

  div.react-select-container {
          border-color: ${({ theme }) => theme.colors.defaultBorder};
          border-radius: 0.5rem;
          color: ${({ theme }) => theme.colors.gray[900]} !important;
          background: ${({ theme }) => theme.colors.lighterBackground};
          width: inherit !important;
          min-width: inherit !important;
          height: inherit !important;
          box-shadow: 8px 4px 10px rgb(0 0 0 / 4%);
          &:hover {
            border-color: ${({ theme }) => theme.colors.darkerBackground} !important;
            transition: ease-in-out 0.2s;
          }
          &:focus {
            border-color: ${({ theme }) => theme.colors.primary.main} !important;
            transition: ease-in-out 0.2s;
          }
          div.react-select__control {
            border-color: ${({ theme }) => theme.colors.defaultBorder};
            color: ${({ theme }) => theme.colors.gray[900]} !important;
            width: inherit !important;
            height: inherit !important;
            background: none;
          &:hover {
            border-color: ${({ theme }) => theme.colors.darkerBackground} !important;
            transition: ease-in-out 0.2s;
          }
          &:focus {
            border-color: ${({ theme }) => theme.colors.primary.main} !important;
            transition: ease-in-out 0.2s;
          }
          div.react-select__value-container div.react-select__value-container div.react-select__value-container--is-multi div.react-select__value-container--has-value{
            border-color: ${({ theme }) => theme.colors.defaultBorder};
          &:hover {
            border-color: ${({ theme }) => theme.colors.darkerBackground} !important;
            transition: ease-in-out 0.2s;
          }
          &:focus {
            border-color: ${({ theme }) => theme.colors.primary.main} !important;
            transition: ease-in-out 0.2s;
          }
            div {
              div.react-select__multi-value {
                background: ${({ theme }) => theme.colors.darkerBackground} !important;
                div.react-select__multi-value__label {
                  color: ${({ theme }) => theme.colors.gray[900]};
                }
              }
            }
            div.react-select__single-value{
              color: ${({ theme }) => theme.colors.gray[900]} !important;
            }
            div.react-select__input-container{
              color: ${({ theme }) => theme.colors.gray[900]} !important;
            }
          }
          }
          div.react-select__menu{
            border-color: ${({ theme }) => theme.colors.defaultBorder} !important;
          &:hover {
            border-color: ${({ theme }) => theme.colors.darkerBackground} !important;
            transition: ease-in-out 0.2s;
          }
          &:focus {
            border-color: ${({ theme }) => theme.colors.primary.main} !important;
            transition: ease-in-out 0.2s;
          }
          div.react-select__menu-list {
            border-color: ${({ theme }) => theme.colors.defaultBorder} !important;
            background: ${({ theme }) => theme.colors.background} !important;;
          &:hover {
            border-color: ${({ theme }) => theme.colors.darkerBackground} !important;
            transition: ease-in-out 0.2s;
          }
          &:focus {
            border-color: ${({ theme }) => theme.colors.primary.main} !important;
            transition: ease-in-out 0.2s;
          }
          div.react-select__option{
            border-color: ${({ theme }) => theme.colors.defaultBorder} !important;
            color: ${({ theme }) => theme.colors.primary.main} !important;
          &:hover {
            border-color: ${({ theme }) => theme.colors.darkerBackground} !important;
            transition: ease-in-out 0.2s;
          }
          &:focus {
            border-color: ${({ theme }) => theme.colors.primary.main} !important;
            transition: ease-in-out 0.2s;
          }
          }
          }
          }
        }

  div.empresaTitle {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        background: ${({ theme }) => theme.colors.background};
        padding: none;
        font-size: 16px;
        font-weight: bold;
        width: 400px;
        margin-bottom: 0.5em;
        margin-top: -4px;
        position: relative;
        right: 370px;

        div.react-select-container {
          border-color: transparent !important;
          border-radius: 0.5rem;
          color: ${({ theme }) => theme.colors.gray[900]} !important;
          background: ${({ theme }) => theme.colors.lighterBackground};
          min-width: 400px;
          /* min-width: inherit; */
          height: inherit !important;
          box-shadow: 8px 4px 10px rgb(0 0 0 / 4%);
          &:hover {
            border-color: ${({ theme }) => theme.colors.darkerBackground} !important;
            transition: ease-in-out 0.2s;
          }
          &:focus {
            border-color: ${({ theme }) => theme.colors.primary.main} !important;
            transition: ease-in-out 0.2s;
          }
          div.react-select__control {
            border-color: transparent !important;
            color: ${({ theme }) => theme.colors.gray[900]} !important;
            width: inherit !important;
            height: inherit !important;
            background: none;
          &:hover {
            border-color: ${({ theme }) => theme.colors.darkerBackground} !important;
            transition: ease-in-out 0.2s;
          }
          &:focus {
            border-color: ${({ theme }) => theme.colors.primary.main} !important;
            transition: ease-in-out 0.2s;
          }
          div.react-select__value-container div.react-select__value-container div.react-select__value-container--is-multi div.react-select__value-container--has-value{
            border-color: transparent !important;
          &:hover {
            border-color: ${({ theme }) => theme.colors.darkerBackground} !important;
            transition: ease-in-out 0.2s;
          }
          &:focus {
            border-color: ${({ theme }) => theme.colors.primary.main} !important;
            transition: ease-in-out 0.2s;
          }
            div {
              div.react-select__multi-value {
                background: ${({ theme }) => theme.colors.darkerBackground} !important;
                div.react-select__multi-value__label {
                  color: ${({ theme }) => theme.colors.gray[900]};
                }
              }
            }
            div.react-select__single-value{
              color: ${({ theme }) => theme.colors.gray[900]} !important;
            }
            div.react-select__input-container{
              color: ${({ theme }) => theme.colors.gray[900]} !important;
            }
          }
          }
          div.react-select__menu{
            border-color: ${({ theme }) => theme.colors.defaultBorder} !important;
          &:hover {
            border-color: ${({ theme }) => theme.colors.darkerBackground} !important;
            transition: ease-in-out 0.2s;
          }
          &:focus {
            border-color: ${({ theme }) => theme.colors.primary.main} !important;
            transition: ease-in-out 0.2s;
          }
          div.react-select__menu-list {
            border-color: ${({ theme }) => theme.colors.defaultBorder} !important;
            background: ${({ theme }) => theme.colors.background} !important;;
          &:hover {
            border-color: ${({ theme }) => theme.colors.darkerBackground} !important;
            transition: ease-in-out 0.2s;
          }
          &:focus {
            border-color: ${({ theme }) => theme.colors.primary.main} !important;
            transition: ease-in-out 0.2s;
          }
          div.react-select__option{
            border-color: ${({ theme }) => theme.colors.defaultBorder} !important;
            color: ${({ theme }) => theme.colors.primary.main} !important;
          &:hover {
            border-color: ${({ theme }) => theme.colors.darkerBackground} !important;
            transition: ease-in-out 0.2s;
          }
          &:focus {
            border-color: ${({ theme }) => theme.colors.primary.main} !important;
            transition: ease-in-out 0.2s;
          }
          }
          }
          }
        }
      }

  small.fileSmall {
    color: ${({ theme }) => theme.colors.gray[900]};
    margin: 0;
    padding: 0;
  }

  img.rightArrow {
    transform: rotate(90deg);
    width: 24px;
  }

  .offcanvas.show:not(.hiding) {
    background: ${({ theme }) => theme.colors.lighterBackground} !important;
  }

  .offcanvas.hiding {
    background: ${({ theme }) => theme.colors.lighterBackground} !important;
  }

  .modal-body-centered {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .year-selection {
      margin-bottom: 24px;
    }
  }

  .low-modal-backdrop {
    z-index: 800 !important; /* ou um valor maior do que o z-index do modal */
    div.modal-header {
            color: ${({ theme }) => theme.colors.gray[900]} !important;
            background: ${({ theme }) => theme.colors.background} !important;
        }

        div.modal-body {
          color: ${({ theme }) => theme.colors.gray[900]} !important;
          background: ${({ theme }) => theme.colors.background} !important;
        }

        div.modal-footer {
          color: ${({ theme }) => theme.colors.gray[900]} !important;
          background: ${({ theme }) => theme.colors.background} !important;

          button.btn-primary {
            color: ${({ theme }) => theme.colors.lighterBackground};
            font-weight: bold;
            background: ${({ theme }) => theme.colors.primary.main};
            border: none;
            &:hover {
              background: ${({ theme }) => theme.colors.primary.light};
            }
            &:focus {
              box-shadow: none !important;
              border: none !important;
            }
          }
        }
  }

  .hiddenExcel {
    display: none !important;
  }

  .dashboardHeader {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    div {
      font-size: 16px;
      font-weight: bold;
    }
  }

    /* width */
::-webkit-scrollbar {
  width: 7px;
  height: 5px;
}

/* Track */
*::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background};
  }

/* Handle */
::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary.main};
    border-radius: 31px;
    border: 1px solid ${({ theme }) => theme.colors.background};
  }

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  transition: background all 0.2s;
  background: ${({ theme }) => theme.colors.primary.dark};
}
`;

