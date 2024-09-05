import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;
  margin-bottom: 16px;
`;

export const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  font-weight: 700;
  font-size: 24px;

  img {
    width: 24px;
    stroke: #000;
    fill: #000;
    filter: ${({ theme }) => theme.filters.oppositeTheme};
  }
`;

export const Detail = styled.div`
  span {
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray[900]};
    opacity: 0.9;
  }
`;
