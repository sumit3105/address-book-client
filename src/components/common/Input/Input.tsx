import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { InputWrapper, Label, StyledInput, ErrorMessage } from './Input.styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, ...rest }, ref) => {
    return (
      <InputWrapper>
        {label && <Label htmlFor={id}>{label}</Label>}
        <StyledInput
          ref={ref}
          id={id}
          $hasError={!!error}
          {...rest}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </InputWrapper>
    );
  }
);

Input.displayName = 'Input';

export default Input;
