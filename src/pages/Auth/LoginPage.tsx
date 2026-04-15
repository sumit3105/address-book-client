import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginUser, clearAuthError } from '@/store/authSlice';
import { validateEmail } from '@/utils/validation';
import type { LoginPayload } from '@/types';
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
} from './Auth.styles';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>();

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
          <Input
            id="login-email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register('email', { validate: validateEmail })}
          />

          <Input
            id="login-password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            error={errors.password?.message}
            {...register('password', { required: 'Password is required' })}
          />

          <Button type="submit" fullWidth isLoading={loading}>
            Sign In
          </Button>
        </AuthForm>

        <AuthLink>
          Don&apos;t have an account? <Link to="/register">Create one</Link>
        </AuthLink>
      </AuthCard>
    </AuthPageWrapper>
  );
};

export default LoginPage;
