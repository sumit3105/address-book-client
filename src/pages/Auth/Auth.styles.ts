import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const AuthPageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.bgPrimary};
`;

export const AuthCard = styled.div`
  width: 100%;
  max-width: 400px;
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: 2.25rem;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  animation: ${fadeInUp} 0.3s ease;
`;

export const AuthHeader = styled.div`
  margin-bottom: 1.75rem;
`;

export const AuthLogo = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.colors.accentPrimary};
  border-radius: ${({ theme }) => theme.radii.lg};
  font-size: 0.875rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1.25rem;
  letter-spacing: -0.03em;
`;

export const AuthTitle = styled.h1`
  font-size: ${({ theme }) => theme.fonts.sizeXl};
  font-weight: ${({ theme }) => theme.fonts.weightSemibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 0.25rem;
  letter-spacing: -0.02em;
`;

export const AuthSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fonts.sizeSm};
`;

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const AuthError = styled.div`
  padding: 0.65rem 0.875rem;
  background: ${({ theme }) => theme.colors.dangerSubtle};
  border: 1px solid rgba(224, 82, 82, 0.25);
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.fonts.sizeSm};
  margin-bottom: 0.25rem;
`;

export const AuthLink = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fonts.sizeSm};
  margin-top: 1.25rem;

  a {
    color: ${({ theme }) => theme.colors.accentPrimary};
    font-weight: ${({ theme }) => theme.fonts.weightMedium};
    transition: color ${({ theme }) => theme.transitions.fast};

    &:hover {
      color: ${({ theme }) => theme.colors.accentPrimaryHover};
    }
  }
`;

export const PasswordStrengthBar = styled.div`
  display: flex;
  gap: 0.2rem;
  margin-top: -0.35rem;
`;

export const StrengthSegment = styled.div<{ $active?: boolean; $color?: string }>`
  flex: 1;
  height: 2px;
  border-radius: 2px;
  background: ${({ $active, $color, theme }) =>
    $active ? $color || theme.colors.accentPrimary : theme.colors.bgElevated};
  transition: background ${({ theme }) => theme.transitions.base};
`;

export const StrengthLabel = styled.span<{ $color?: string }>`
  font-size: 0.7rem;
  color: ${({ $color, theme }) => $color || theme.colors.textMuted};
  margin-top: -0.25rem;
  text-align: right;
`;
