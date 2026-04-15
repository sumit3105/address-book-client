import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.96) translateY(8px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
`;

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.72);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 1rem;
  animation: ${fadeIn} 0.15s ease;
`;

interface ModalContainerProps {
  $maxWidth?: string;
}

export const ModalContainer = styled.div<ModalContainerProps>`
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: 1.75rem;
  width: 100%;
  max-width: ${({ $maxWidth }) => $maxWidth || '520px'};
  max-height: 88vh;
  overflow-y: auto;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  animation: ${scaleIn} 0.2s ease;
  position: relative;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.10);
    border-radius: 99px;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
`;

export const ModalTitle = styled.h2`
  font-size: ${({ theme }) => theme.fonts.sizeLg};
  font-weight: ${({ theme }) => theme.fonts.weightSemibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: 1px solid transparent;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0;
  border-radius: ${({ theme }) => theme.radii.sm};
  transition: all ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
    background: ${({ theme }) => theme.colors.bgElevated};
    border-color: ${({ theme }) => theme.colors.borderColor};
  }
`;

export const ModalBody = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
`;
