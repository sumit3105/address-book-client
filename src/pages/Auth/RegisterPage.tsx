import { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { registerUser, clearAuthError } from '@/store/authSlice';
import { validateEmail, validatePassword, getPasswordStrength } from '@/utils/validation';
import type { RegisterPayload } from '@/types';
import { Input } from '@vision-ui/components/form/Input';
import { Password } from '@vision-ui/components/form/Password';
import { Button } from '@vision-ui/components/elements/Button';
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

  const { control, handleSubmit, watch } = useForm<RegisterFormData>();

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
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ validate: validateEmail }}
            render={({ field, fieldState }) => (
              <Input
                name={field.name}
                label="Email"
                placeholder="you@example.com"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onChange}
                errorMessage={fieldState.error?.message}
                required
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ validate: validatePassword }}
            render={({ field, fieldState }) => (
              <Password
                name={field.name}
                label="Password"
                placeholder="Create a strong password"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onChange}
                errorMessage={fieldState.error?.message}
                required
              />
            )}
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
                {passwordStrength.strength.charAt(0).toUpperCase() +
                  passwordStrength.strength.slice(1)}
              </StrengthLabel>
            </>
          )}

          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            rules={{
              required: 'Please confirm your password',
              validate: (value) =>
                value === watchedPassword || 'Passwords do not match',
            }}
            render={({ field, fieldState }) => (
              <Password
                name={field.name}
                label="Confirm Password"
                placeholder="Re-enter your password"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onChange}
                errorMessage={fieldState.error?.message}
                required
              />
            )}
          />

          <Button
            label={loading ? 'Creating account…' : 'Create Account'}
            type="filled"
            action="primary"
            loading={loading}
            block
            onClick={handleSubmit(onSubmit)}
          />
        </AuthForm>

        <AuthLink>
          Already have an account? <Link to="/login">Sign in</Link>
        </AuthLink>
      </AuthCard>
    </AuthPageWrapper>
  );
};

export default RegisterPage;
