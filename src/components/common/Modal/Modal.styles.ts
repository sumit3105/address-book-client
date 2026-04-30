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
  background: ${({ theme }) => theme.color.card.basic.bg.regular};
  border: ${({ theme }) => theme.borderSize.regular} solid ${({ theme }) => theme.color.border.primary};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: 1.75rem;
  width: 100%;
  max-width: ${({ $maxWidth }) => $maxWidth || '520px'};
  max-height: 88vh;
  overflow-y: auto;
  box-shadow: ${({ theme }) => theme.color.shadow.regular};
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
  border-bottom: ${({ theme }) => theme.borderSize.regular} solid ${({ theme }) => theme.color.border.primary};
`;

export const ModalTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.title};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.color.text.primary};
  margin: 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: ${({ theme }) => theme.borderSize.regular} solid transparent;
  color: ${({ theme }) => theme.color.text.disabled};
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  transition: all 0.15s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;

  &:hover {
    color: ${({ theme }) => theme.color.text.primary};
    background: ${({ theme }) => theme.color.bg.menu.hover};
    border-color: ${({ theme }) => theme.color.border.active};
  }
`;

export const ModalBody = styled.div`
  color: ${({ theme }) => theme.color.text.regular};
  line-height: 1.6;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: ${({ theme }) => theme.borderSize.regular} solid ${({ theme }) => theme.color.border.primary};
`;
