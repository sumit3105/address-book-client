import styled, { css, keyframes } from 'styled-components';

// ========================
// Button Variants
// ========================

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  $variant?: ButtonVariant;
  $size?: ButtonSize;
  $fullWidth?: boolean;
  $isLoading?: boolean;
}

const spin = keyframes`
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const sizeStyles = {
  sm: css`
    padding: 0.35rem 0.75rem;
    font-size: 0.8rem;
  `,
  md: css`
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  `,
  lg: css`
    padding: 0.65rem 1.25rem;
    font-size: 0.9375rem;
  `,
};

const variantStyles = {
  primary: css`
    background: ${({ theme }) => theme.color.primary};
    color: #fff;
    border-color: ${({ theme }) => theme.color.primary};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.color.button.primary.hover};
      border-color: ${({ theme }) => theme.color.button.primary.hover};
    }

    &:active:not(:disabled) {
      opacity: 0.9;
    }
  `,
  secondary: css`
    background: ${({ theme }) => theme.color.bg.menu.hover};
    color: ${({ theme }) => theme.color.text.primary};
    border-color: ${({ theme }) => theme.color.border.primary};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.color.bg.menu.hover};
      border-color: ${({ theme }) => theme.color.border.active};
    }
  `,
  danger: css`
    background: ${({ theme }) => theme.color.button.reject.shade};
    color: #fff;
    border-color: ${({ theme }) => theme.color.button.reject.shade};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.color.button.reject.hover};
      border-color: ${({ theme }) => theme.color.button.reject.hover};
    }
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.color.text.regular};
    border-color: transparent;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.color.card.basic.bg.regular};
      color: ${({ theme }) => theme.color.text.primary};
      border-color: ${({ theme }) => theme.color.border.primary};
    }
  `,
  outline: css`
    background: transparent;
    color: ${({ theme }) => theme.color.primary};
    border-color: ${({ theme }) => theme.color.primary};

    &:hover:not(:disabled) {
      background: rgba(50, 114, 255, 0.08);
    }
  `,
};

export const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: ${({ theme }) => theme.borderSize.regular} solid transparent;
  font-family: ${({ theme }) => theme.fontFamily};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  position: relative;
  letter-spacing: 0.01em;

  ${({ $size = 'md' }) => sizeStyles[$size]}
  ${({ $variant = 'primary' }) => variantStyles[$variant]}
  ${({ $fullWidth }) => $fullWidth && css`width: 100%;`}

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  ${({ $isLoading }) =>
    $isLoading &&
    css`
      pointer-events: none;
      color: transparent !important;

      &::after {
        content: '';
        position: absolute;
        width: 15px;
        height: 15px;
        border: 1.5px solid rgba(255, 255, 255, 0.25);
        border-top-color: rgba(255, 255, 255, 0.85);
        border-radius: 50%;
        animation: ${spin} 0.65s linear infinite;
      }
    `}
`;

export const Spinner = styled.div`
  width: 15px;
  height: 15px;
  border: 1.5px solid rgba(255, 255, 255, 0.25);
  border-top-color: rgba(255, 255, 255, 0.85);
  border-radius: 50%;
  animation: ${spin} 0.65s linear infinite;
`;
