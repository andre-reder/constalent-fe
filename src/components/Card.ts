import styled from 'styled-components';

interface CardInterface {
  justifyContent?: string;
  selected?: boolean;
}

export const Card = styled.div<CardInterface>`
  background: ${({ theme }) => theme.colors.lighterBackground};
  box-shadow: 8px 4px 10px rgba(0, 0, 0, 0.04);
  padding: 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: ${({ justifyContent }) => (justifyContent === 'flex-start' ? 'flex-start' : 'space-between')};
  width: 100%;
  transition: all 0.2s ease-in-out;

  & + & {
    margin-top: 16px;
  }

  .editStatus {
    position: relative;
    left: 25%;
    transform: translateX(-50%);

    @media(max-width: 1340px) {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    input {
      color: ${({ theme, selected }) => (selected ? theme.colors.lighterBackground : theme.colors.primary.main)};
      background: ${({ theme, selected }) => (selected ? theme.colors.primary.main : theme.colors.background)};
      text-decoration: none;
      font-weight: bold;
      border: 2px solid ${({ theme }) => theme.colors.primary.main};
      padding: 4px 8px;
      border-radius: 4px;
      transition: all 0.2s ease-in;
      font-size: 14px;
      height: 36px;
      margin: 12px;

      @media(max-width: 500px) {
        font-size: 12px;
        height: 40px;
        padding: 2px 4px;
  }

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary.main};
      color: ${({ theme }) => theme.colors.gray[900]};
   }
  }

    @media(max-width: 700px){
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    button {
      margin: 12px;
    }

  }


  }

  .info {
    .card-title {
      display: flex;
      align-items: center;

      small {
        background: ${({ theme }) => theme.colors.blue[50]};
        color: ${({ theme }) => theme.colors.blue[900]};
        font-weight: bold;
        text-transform: uppercase;
        padding: 4px;
        border-radius: 4px;
        margin-left: 8px;
        font-size: 10px;
      }

      small.green {
          background: ${({ theme }) => theme.colors.green[100]};
          color: ${({ theme }) => theme.colors.green[500]};
      }

      small.orange {
          background: ${({ theme }) => theme.colors.orange[100]};
          color: ${({ theme }) => theme.colors.orange[500]};
        }

      small.gray {
        background: ${({ theme }) => theme.colors.gray[100]};
        color: ${({ theme }) => theme.colors.gray[900]};
      }
    }

    span {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      font-size: 14px;
      color: ${({ theme }) => theme.colors.gray[201]};

      strong {
        margin-right: 5px;
      }

      img {
        margin-left: 5px;
        width: 15px;
      }

      div {
        margin-top: 4px;
      }
    }
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 8px;

    img {
      &:hover{
        opacity: 0.5;
        transition: ease-in 0.2s;
      }
      &:not(:hover) {
        opacity: 1;
        transition: ease-in 0.2s;
      }
    }

    a {
      background: transparent;
      border: none;
      /* width: 23px;
      height: 23px; */

      img {
        padding: 0;
        width: 23px;
      }
      }

    a.qrCodeLink {
      padding: 0;
      width: 24px;
      margin-top: 1px;

      img {
        width: 100% !important;
      }
    }

    button {
      border: none;
      background: transparent;
      /* margin-right: 8px; */


      img {
        padding: 0;
        width: 23px;
      }
    }
  }
`;
