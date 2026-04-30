import styled, { keyframes, css } from 'styled-components';
import type { ToastType } from '@/types';

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(100%); }
  to { opacity: 1; transform: translateX(0); }
`;

const slideOut = keyframes`
  from { opacity: 1; transform: translateX(0); }
  to { opacity: 0; transform: translateX(100%); }
`;

const colorMap: Record<ToastType, { bg: string; border: string; icon: string }> = {
  success: { bg: 'rgba(61, 189, 126, 0.10)', border: '#3dbd7e', icon: '✓' },
  error:   { bg: 'rgba(224, 82, 82, 0.10)',  border: '#e05252', icon: '✕' },
  warning: { bg: 'rgba(212, 147, 58, 0.10)', border: '#d4933a', icon: '⚠' },
  info:    { bg: 'rgba(79, 142, 247, 0.10)', border: '#4f8ef7', icon: 'ℹ' },
};

export const ToastContainer = styled.div`
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 400;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 400px;
`;

interface ToastItemProps {
  $type: ToastType;
  $isExiting?: boolean;
}

export const ToastItem = styled.div<ToastItemProps>`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  background: ${({ theme }) => theme.color.card.basic.bg.regular};
  border: 1px solid ${({ $type }) => colorMap[$type].border};
  border-left: 3px solid ${({ $type }) => colorMap[$type].border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.color.shadow.regular};
  animation: ${({ $isExiting }) =>
    $isExiting
      ? css`
          ${slideOut} 0.3s ease forwards
        `
      : css`
          ${slideIn} 0.3s ease
        `};
`;

export const ToastIcon = styled.span<{ $type: ToastType }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({ $type }) => colorMap[$type].bg};
  color: ${({ $type }) => colorMap[$type].border};
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 1px;

  &::after {
    content: '${({ $type }) => colorMap[$type].icon}';
  }
`;

export const ToastContent = styled.div`
  flex: 1;
`;

export const ToastText = styled.p`
  color: ${({ theme }) => theme.color.text.primary};
  font-size: ${({ theme }) => theme.fontSize.subText};
  line-height: 1.5;
  margin: 0;
`;

export const ToastClose = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.color.text.disabled};
  cursor: pointer;
  padding: 0.15rem;
  font-size: 1rem;
  line-height: 1;
  transition: color 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.color.text.primary};
  }
`;
