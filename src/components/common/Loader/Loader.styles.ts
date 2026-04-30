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
  border: 3px solid ${({ theme }) => theme.color.border.primary};
  border-top-color: ${({ theme }) => theme.color.primary};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

export const LoaderText = styled.p`
  color: ${({ theme }) => theme.color.text.disabled};
  font-size: ${({ theme }) => theme.fontSize.subText};
`;

// ========================
// Skeleton Loader
// ========================

export const SkeletonLine = styled.div<{ $width?: string; $height?: string }>`
  width: ${({ $width }) => $width || '100%'};
  height: ${({ $height }) => $height || '1rem'};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.color.card.basic.bg.regular} 25%,
    ${({ theme }) => theme.color.bg.menu.hover} 50%,
    ${({ theme }) => theme.color.card.basic.bg.regular} 75%
  );
  background-size: 200% 100%;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  animation: ${shimmer} 1.5s ease-in-out infinite;
`;

export const SkeletonRow = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 1rem 0;
  border-bottom: ${({ theme }) => theme.borderSize.regular} solid ${({ theme }) => theme.color.border.primary};
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
  background: ${({ theme }) => theme.color.primary};
  animation: ${pulse} 1.2s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
`;
