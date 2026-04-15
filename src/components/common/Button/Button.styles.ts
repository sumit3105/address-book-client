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
    background: ${({ theme }) => theme.colors.accentPrimary};
    color: #fff;
    border-color: ${({ theme }) => theme.colors.accentPrimary};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.accentPrimaryHover};
      border-color: ${({ theme }) => theme.colors.accentPrimaryHover};
    }

    &:active:not(:disabled) {
      opacity: 0.9;
    }
  `,
  secondary: css`
    background: ${({ theme }) => theme.colors.bgElevated};
    color: ${({ theme }) => theme.colors.textPrimary};
    border-color: ${({ theme }) => theme.colors.borderColor};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.bgCardHover};
      border-color: ${({ theme }) => theme.colors.borderColorHover};
    }
  `,
  danger: css`
    background: ${({ theme }) => theme.colors.danger};
    color: #fff;
    border-color: ${({ theme }) => theme.colors.danger};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.dangerHover};
      border-color: ${({ theme }) => theme.colors.dangerHover};
    }
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.textSecondary};
    border-color: transparent;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.bgCard};
      color: ${({ theme }) => theme.colors.textPrimary};
      border-color: ${({ theme }) => theme.colors.borderColor};
    }
  `,
  outline: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.accentPrimary};
    border-color: ${({ theme }) => theme.colors.accentPrimary};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.accentSubtle};
    }
  `,
};

export const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid transparent;
  font-family: ${({ theme }) => theme.fonts.family};
  font-weight: ${({ theme }) => theme.fonts.weightMedium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
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
