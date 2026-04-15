import styled, { css } from 'styled-components';

interface InputWrapperProps {
  $hasError?: boolean;
}

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  width: 100%;
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.fonts.sizeSm};
  font-weight: ${({ theme }) => theme.fonts.weightMedium};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const StyledInput = styled.input<InputWrapperProps>`
  width: 100%;
  padding: 0.6rem 0.875rem;
  background: ${({ theme }) => theme.colors.bgInput};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.fonts.family};
  font-size: ${({ theme }) => theme.fonts.sizeSm};
  transition: border-color ${({ theme }) => theme.transitions.fast},
              box-shadow ${({ theme }) => theme.transitions.fast};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderColorHover};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.borderColorFocus};
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }

  ${({ $hasError }) =>
    $hasError &&
    css`
      border-color: ${({ theme }) => theme.colors.danger};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.dangerSubtle};

      &:focus {
        border-color: ${({ theme }) => theme.colors.danger};
        box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.dangerSubtle};
      }
    `}
`;

export const ErrorMessage = styled.span`
  font-size: ${({ theme }) => theme.fonts.sizeXs};
  color: ${({ theme }) => theme.colors.danger};
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const StyledSelect = styled.select<InputWrapperProps>`
  width: 100%;
  padding: 0.6rem 2.25rem 0.6rem 0.875rem;
  background: ${({ theme }) => theme.colors.bgInput};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.fonts.family};
  font-size: ${({ theme }) => theme.fonts.sizeSm};
  transition: border-color ${({ theme }) => theme.transitions.fast};
  outline: none;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666666' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.875rem center;

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderColorHover};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.borderColorFocus};
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }

  option {
    background: ${({ theme }) => theme.colors.bgSecondary};
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  ${({ $hasError }) =>
    $hasError &&
    css`
      border-color: ${({ theme }) => theme.colors.danger};
    `}
`;
