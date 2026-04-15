import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.8; }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// ========================
// Full Page Loader
// ========================

export const LoaderOverlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  padding: 3rem;
  min-height: 200px;
`;

export const SpinnerRing = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${({ theme }) => theme.colors.borderColor};
  border-top-color: ${({ theme }) => theme.colors.accentPrimary};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

export const LoaderText = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fonts.sizeSm};
`;

// ========================
// Skeleton Loader
// ========================

export const SkeletonLine = styled.div<{ $width?: string; $height?: string }>`
  width: ${({ $width }) => $width || '100%'};
  height: ${({ $height }) => $height || '1rem'};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.bgCard} 25%,
    ${({ theme }) => theme.colors.bgCardHover} 50%,
    ${({ theme }) => theme.colors.bgCard} 75%
  );
  background-size: 200% 100%;
  border-radius: ${({ theme }) => theme.radii.sm};
  animation: ${shimmer} 1.5s ease-in-out infinite;
`;

export const SkeletonRow = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
`;

// ========================
// Dot Pulse Loader
// ========================

export const DotContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
`;

export const Dot = styled.div<{ $delay: number }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accentPrimary};
  animation: ${pulse} 1.2s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
`;
