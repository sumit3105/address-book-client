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
  background: ${({ theme }) => theme.color.bg.default};
`;

export const AuthCard = styled.div`
  width: 100%;
  max-width: 420px;
  background: ${({ theme }) => theme.color.card.basic.bg.regular};
  border: ${({ theme }) => theme.borderSize.regular} solid ${({ theme }) => theme.color.border.primary};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: 2.5rem;
  box-shadow: 0 4px 24px ${({ theme }) => theme.color.shadow.regular};
  animation: ${fadeInUp} 0.3s ease;
`;

export const AuthHeader = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

export const AuthLogo = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: ${({ theme }) => theme.color.primary};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.color.text.inverted};
  margin-bottom: 1.25rem;
  letter-spacing: -0.03em;
`;

export const AuthTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.sectionHeader};
  font-weight: ${({ theme }) => theme.fontWeight.boldX};
  color: ${({ theme }) => theme.color.text.header};
  margin-bottom: 0.35rem;
  font-family: ${({ theme }) => theme.fontFamily};
`;

export const AuthSubtitle = styled.p`
  color: ${({ theme }) => theme.color.text.disabled};
  font-size: ${({ theme }) => theme.fontSize.subText};
  font-family: ${({ theme }) => theme.fontFamily};
`;

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const AuthError = styled.div`
  padding: 0.75rem 1rem;
  background: ${({ theme }) => theme.color.card.kpi.bg.failed};
  border: ${({ theme }) => theme.borderSize.regular} solid ${({ theme }) => theme.color.text.failed};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  color: ${({ theme }) => theme.color.text.failed};
  font-size: ${({ theme }) => theme.fontSize.subText};
  font-family: ${({ theme }) => theme.fontFamily};
  margin-bottom: 0.5rem;
`;

export const AuthLink = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  color: ${({ theme }) => theme.color.text.disabled};
  font-size: ${({ theme }) => theme.fontSize.subText};
  font-family: ${({ theme }) => theme.fontFamily};

  a {
    color: ${({ theme }) => theme.color.text.primary};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    text-decoration: none;

    &:hover {
      color: ${({ theme }) => theme.color.text.highlight};
    }
  }
`;

export const PasswordStrengthBar = styled.div`
  display: flex;
  gap: 4px;
  margin-top: -0.5rem;
`;

export const StrengthSegment = styled.div<{ $active: boolean; $color: string }>`
  flex: 1;
  height: 4px;
  border-radius: 2px;
  background: ${({ $active, $color }) => ($active ? $color : '#e5e7eb')};
  transition: background 0.2s ease;
`;

export const StrengthLabel = styled.span<{ $color: string }>`
  font-size: ${({ theme }) => theme.fontSize.subText};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ $color }) => $color};
  font-family: ${({ theme }) => theme.fontFamily};
`;
