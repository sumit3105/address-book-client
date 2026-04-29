import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginUser, clearAuthError } from '@/store/authSlice';
import { validateEmail } from '@/utils/validation';
import type { LoginPayload } from '@/types';
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
} from './Auth.styles';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth);

  const { control, handleSubmit } = useForm<LoginPayload>();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  const onSubmit = async (data: LoginPayload) => {
    const result = await dispatch(loginUser(data));
    if (loginUser.fulfilled.match(result)) {
      showToast('success', 'Welcome back! You have been logged in.');
      navigate('/', { replace: true });
    }
  };

  return (
    <AuthPageWrapper>
      <AuthCard>
        <AuthHeader>
          <AuthLogo>AB</AuthLogo>
          <AuthTitle>Welcome Back</AuthTitle>
          <AuthSubtitle>Sign in to your AddressBook account</AuthSubtitle>
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
            rules={{ required: 'Password is required' }}
            render={({ field, fieldState }) => (
              <Password
                name={field.name}
                label="Password"
                placeholder="Enter your password"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onChange}
                errorMessage={fieldState.error?.message}
                required
              />
            )}
          />

          <Button
            label={loading ? 'Signing in…' : 'Sign In'}
            type="filled"
            action="primary"
            loading={loading}
            block
            onClick={handleSubmit(onSubmit)}
          />
        </AuthForm>

        <AuthLink>
          Don&apos;t have an account? <Link to="/register">Create one</Link>
        </AuthLink>
      </AuthCard>
    </AuthPageWrapper>
  );
};

export default LoginPage;
