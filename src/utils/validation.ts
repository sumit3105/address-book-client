/**
 * Validation utilities matching backend rules
 */

// ========================
// Regex patterns
// ========================

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PHONE_REGEX = /^[6-9]\d{9}$/;
export const PINCODE_REGEX = /^[1-9][0-9]{5}$/;

// Password: min 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special
export const PASSWORD_UPPERCASE = /[A-Z]/;
export const PASSWORD_LOWERCASE = /[a-z]/;
export const PASSWORD_DIGIT = /[0-9]/;
export const PASSWORD_SPECIAL = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

// ========================
// Validation functions
// ========================

export const validateEmail = (value: string): string | true => {
  if (!value) return 'Email is required';
  if (!EMAIL_REGEX.test(value)) return 'Please enter a valid email address';
  return true;
};

export const validatePassword = (value: string): string | true => {
  if (!value) return 'Password is required';
  if (value.length < 8) return 'Password must be at least 8 characters';
  if (!PASSWORD_UPPERCASE.test(value)) return 'Password must contain at least one uppercase letter';
  if (!PASSWORD_LOWERCASE.test(value)) return 'Password must contain at least one lowercase letter';
  if (!PASSWORD_DIGIT.test(value)) return 'Password must contain at least one digit';
  if (!PASSWORD_SPECIAL.test(value)) return 'Password must contain at least one special character';
  return true;
};

export const validatePhone = (value: string | undefined): string | true => {
  if (!value || value.trim() === '') return true; // optional field
  if (!PHONE_REGEX.test(value)) return 'Phone must be 10 digits starting with 6, 7, 8, or 9';
  return true;
};

export const validatePincode = (value: string | undefined): string | true => {
  if (!value || value.trim() === '') return true; // optional field
  if (!PINCODE_REGEX.test(value)) return 'Pincode must be 6 digits, first digit cannot be 0';
  return true;
};

export const validateRequired = (fieldName: string) => (value: string): string | true => {
  if (!value || value.trim() === '') return `${fieldName} is required`;
  return true;
};

// ========================
// Password strength meter
// ========================

export type PasswordStrength = 'weak' | 'fair' | 'good' | 'strong';

export const getPasswordStrength = (password: string): { strength: PasswordStrength; score: number } => {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (PASSWORD_UPPERCASE.test(password)) score++;
  if (PASSWORD_LOWERCASE.test(password)) score++;
  if (PASSWORD_DIGIT.test(password)) score++;
  if (PASSWORD_SPECIAL.test(password)) score++;

  if (score <= 2) return { strength: 'weak', score: 1 };
  if (score <= 3) return { strength: 'fair', score: 2 };
  if (score <= 4) return { strength: 'good', score: 3 };
  return { strength: 'strong', score: 4 };
};
