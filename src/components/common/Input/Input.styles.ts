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
  font-size: ${({ theme }) => theme.fontSize.subText};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.color.text.regular};
`;

export const StyledInput = styled.input<InputWrapperProps>`
  width: 100%;
  padding: 0.6rem 0.875rem;
  background: ${({ theme }) => theme.color.form.bg};
  border: ${({ theme }) => theme.borderSize.regular} solid ${({ theme }) => theme.color.form.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  color: ${({ theme }) => theme.color.text.primary};
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ theme }) => theme.fontSize.subText};
  transition: border-color 0.15s ease,
              box-shadow 0.15s ease;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.color.text.disabled};
  }

  &:hover {
    border-color: ${({ theme }) => theme.color.form.hover};
  }

  &:focus {
    border-color: ${({ theme }) => theme.color.form.indicator.primary};
    box-shadow: ${({ theme }) => theme.color.form.shadow};
  }

  ${({ $hasError }) =>
    $hasError &&
    css`
      border-color: ${({ theme }) => theme.color.form.error};
      box-shadow: 0 0 0 3px rgba(224, 82, 82, 0.1);

      &:focus {
        border-color: ${({ theme }) => theme.color.form.error};
        box-shadow: 0 0 0 3px rgba(224, 82, 82, 0.1);
      }
    `}
`;

export const ErrorMessage = styled.span`
  font-size: ${({ theme }) => theme.fontSize.tiny};
  color: ${({ theme }) => theme.color.form.error};
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const StyledSelect = styled.select<InputWrapperProps>`
  width: 100%;
  padding: 0.6rem 2.25rem 0.6rem 0.875rem;
  background: ${({ theme }) => theme.color.form.bg};
  border: ${({ theme }) => theme.borderSize.regular} solid ${({ theme }) => theme.color.form.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  color: ${({ theme }) => theme.color.text.primary};
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ theme }) => theme.fontSize.subText};
  transition: border-color 0.15s ease;
  outline: none;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666666' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.875rem center;

  &:hover {
    border-color: ${({ theme }) => theme.color.form.hover};
  }

  &:focus {
    border-color: ${({ theme }) => theme.color.form.indicator.primary};
    box-shadow: ${({ theme }) => theme.color.form.shadow};
  }

  option {
    background: ${({ theme }) => theme.color.bg.secondary};
    color: ${({ theme }) => theme.color.text.primary};
  }

  ${({ $hasError }) =>
    $hasError &&
    css`
      border-color: ${({ theme }) => theme.color.form.error};
    `}
`;
