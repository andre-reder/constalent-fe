import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background: ${({ theme }) => theme.colors.lighterBackground};
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.lighterBackground};
  border-radius: 0.375em;
  padding: 16px 24px 24px 24px;
  margin: 12px 8px 24px 0px;

  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 12px;
    img {
      width: 28px;
      margin-right: 8px;
    }
    div {
      font-size: 18px;
      font-weight: bold;
    }
  }

  > div {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    gap: 12px;
    margin: 12px 0;

    @media(max-width: 500px) {
      flex-direction: column;
      /* align-items: flex-start; */
      gap: 12px;
    }

    .range-slider {
      width: 100%;
      .range-slider__range {
        background: ${({ theme }) => theme.colors.primary.main};
      }
      .range-slider__thumb {
        background: ${({ theme }) => theme.colors.primary.main};
      }
      .single-thumb {
        width: 0;
      }
      .range-slider__thumb[data-lower] {
        width: 0;
      }
      .range-slider__range {
        border-radius: 6px;
      }
    }
  }
`;

export const Group = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20%;
  position: relative;
  bottom: 10px;

  @media(max-width: 500px) {
      width: 50%;
      margin-top: 8px;
    }
  header {
    font-size: 14px;
    font-weight: 700;
  }
`;
