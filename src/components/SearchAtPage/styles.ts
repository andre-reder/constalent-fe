import styled from 'styled-components';

export const InputSearchContainer = styled.div`
  width: 100%;
  margin-right: 8px;
  @media(max-width: 400px){
    margin-top: 2.5em;
  };

  input {
    width: 100%;
    background: ${({ theme }) => theme.colors.lighterBackground};
    color: ${({ theme }) => theme.colors.gray[900]};
    border: none;
    border-radius: 8px;
    height: 42px;
    box-shadow: 8px 4px 10px rgba(0, 0, 0, 0.04);
    outline: 0;
    padding: 0 16px;

    &::placeholder {
      color: #BCBCBC;
    }
  }
`;
export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  margin-bottom: 8px;
  gap: 24px;
  @media(max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 12px;
  }
`;
