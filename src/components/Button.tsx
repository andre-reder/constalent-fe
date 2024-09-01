import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import OpacityAnimation from './OpacityAnimation';

interface ButtonInterface extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  small?: boolean;
  danger?: boolean;
  cancel?: boolean;
  tooltip?: string;
  tooltipExplanation?: string;
}

const Container = styled.div`
  position: relative;
  display: inline-block; /* Para envolver o botão */
  width: 100%;
`;

const Button = styled.button<ButtonInterface>`
  position: relative; /* Para posicionamento do tooltip */
  height: ${({ small }) => (small ? '36px' : '52px')};
  padding: ${({ small }) => (small ? '0 8px' : '0 16px')};
  border: none;
  background: ${({ theme }) => theme.colors.primary.main};
  font-size: ${({ small }) => (small ? '14px' : '16px')};
  box-shadow: 8px 4px 10px rgba(0, 0, 0, 0.04);
  font-weight: bold;
  color: ${({ theme }) => theme.colors.lighterBackground};
  border-radius: 4px;
  transition: background 0.2s ease-in;
  cursor: pointer;

  @media(max-width: 500px) {
    height: ${({ small }) => (small ? '48px' : '60px')};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primary.light};
  }

  &:active {
    background: ${({ theme }) => theme.colors.primary.dark};
  }

  &[disabled] {
    opacity: 0.5;
    background: ${({ theme }) => theme.colors.primary.main};
    cursor: not-allowed;
  }

  ${({ theme, danger }) => (
    danger &&
    css`
      background: ${theme.colors.danger.main};

      &:hover {
        background: ${theme.colors.danger.light};
      }

      &:active {
        background: ${theme.colors.danger.dark};
      }
    `
  )}

  ${({ theme, cancel }) => (
    cancel &&
    css`
      background: ${theme.colors.gray[201]};

      &:hover {
        background: ${theme.colors.gray[100]};
      }

      &:active {
        background: ${theme.colors.gray[900]};
      }
    `
  )}
`;

const Tooltip = styled.div`
  position: absolute;
  background-color: black;
  color: white;
  padding: 8px;
  border-radius: 4px;
  z-index: 999; /* Para garantir que o tooltip esteja na frente de outros elementos */
  bottom: calc(100% + 8px); /* Posicionamento acima do botão */
  left: 50%; /* Centraliza horizontalmente */
  transform: translateX(-50%); /* Centraliza horizontalmente */
  text-align: center;
  opacity: 0.9;
  `;

const CustomButton: React.FC<ButtonInterface> = ({ tooltip, tooltipExplanation, ...props }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleMouseEnter = () => {

    clearTimeout(timeoutRef.current!);
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowTooltip(false);
    }, 100); // Aguarda 100ms antes de ocultar o tooltip
  };

  return (
    <Container
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Button {...props}>
        {props.children}
      </Button>
        {tooltip && showTooltip &&
          <OpacityAnimation delay={0.1}>
            <Tooltip>{tooltipExplanation} {tooltip}</Tooltip>
          </OpacityAnimation>
        }
    </Container>
  );
};

export default CustomButton;
