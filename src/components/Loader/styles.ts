import { RefObject } from 'react';
import styled, { keyframes, css } from 'styled-components';

interface StyledLoaderInterface {
  isLeaving: boolean;
  ref: RefObject<HTMLDivElement>
}

const fadeIn = keyframes`
  0% {opacity: 0;}
  100% {opacity: 1;}
`;

const fadeOut = keyframes`
  0% {opacity: 1;}
  100% {opacity: 0;}
`;

export const Overlay = styled.div<StyledLoaderInterface>`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.colors.backgroundWithOpacity};
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.3s;
  z-index: 999999999999;

  ${({ isLeaving }) => isLeaving && css`
    animation: ${fadeOut} 0.2s forwards;
  `}
`;
