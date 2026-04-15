import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { registerUser, clearAuthError } from '@/store/authSlice';
import { validateEmail, validatePassword, getPasswordStrength } from '@/utils/validation';
import type { RegisterPayload } from '@/types';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { useToast } from '@/components/common/Toast';
import {
  AuthPageWrapper,
  AuthCard,
  AuthHeader,
  AuthLogo,
  AuthTitle,
  AuthSubtitle,
  AuthForm,
  AuthError,
  AuthLink,
  PasswordStrengthBar,
  StrengthSegment,
  StrengthLabel,
} from './Auth.styles';

interface RegisterFormData extends RegisterPayload {
  confirmPassword: string;
}

const strengthColors: Record<string, string> = {
  weak: '#ef4444',
  fair: '#f59e0b',
  good: '#3b82f6',
  strong: '#10b981',
};

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const watchedPassword = watch('password', '');

  const passwordStrength = useMemo(
    () => getPasswordStrength(watchedPassword),
    [watchedPassword]
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  const onSubmit = async (data: RegisterFormData) => {
    const { confirmPassword: _confirmPassword, ...payload } = data;
    const result = await dispatch(registerUser(payload));
    if (registerUser.fulfilled.match(result)) {
      showToast('success', 'Account created! Please sign in.');
      navigate('/login');
    }
  };

  return (
    <AuthPageWrapper>
      <AuthCard>
        <AuthHeader>
          <AuthLogo>AB</AuthLogo>
          <AuthTitle>Create Account</AuthTitle>
          <AuthSubtitle>Get started with AddressBook</AuthSubtitle>
        </AuthHeader>

        {error && <AuthError>{error}</AuthError>}

        <AuthForm onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="register-email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register('email', { validate: validateEmail })}
          />

          <Input
            id="register-password"
            label="Password"
            type="password"
            placeholder="Create a strong password"
            error={errors.password?.message}
            {...register('password', { validate: validatePassword })}
          />

          {watchedPassword && (
            <>
              <PasswordStrengthBar>
                {[1, 2, 3, 4].map((level) => (
                  <StrengthSegment
                    key={level}
                    $active={passwordStrength.score >= level}
                    $color={strengthColors[passwordStrength.strength]}
                  />
                ))}
              </PasswordStrengthBar>
              <StrengthLabel $color={strengthColors[passwordStrength.strength]}>
                {passwordStrength.strength.charAt(0).toUpperCase() + passwordStrength.strength.slice(1)}
              </StrengthLabel>
            </>
          )}

          <Input
            id="register-confirm-password"
            label="Confirm Password"
            type="password"
            placeholder="Re-enter your password"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) =>
                value === watchedPassword || 'Passwords do not match',
            })}
          />

          <Button type="submit" fullWidth isLoading={loading}>
            Create Account
          </Button>
        </AuthForm>

        <AuthLink>
          Already have an account? <Link to="/login">Sign in</Link>
        </AuthLink>
      </AuthCard>
    </AuthPageWrapper>
  );
};

export default RegisterPage;
