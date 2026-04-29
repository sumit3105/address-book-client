import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const FormPageWrapper = styled.div`
  max-width: 760px;
  margin: 0 auto;
  animation: ${fadeIn} 0.4s ease;
  font-family: ${({ theme }) => theme.fontFamily};
`;

export const FormHeader = styled.div`
  margin-bottom: 2rem;
`;

export const FormCard = styled.form`
  background: ${({ theme }) => theme.color.card.basic.bg.regular};
  border: ${({ theme }) => theme.borderSize.regular} solid ${({ theme }) => theme.color.border.primary};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: 2rem;
  box-shadow: 0 2px 8px ${({ theme }) => theme.color.shadow.regular};
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const FormFullWidth = styled.div`
  grid-column: 1 / -1;
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding-top: 0.5rem;
  border-top: ${({ theme }) => theme.borderSize.regular} solid ${({ theme }) => theme.color.border.primary};
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.color.text.primary};
  font-size: ${({ theme }) => theme.fontSize.text};
  font-family: ${({ theme }) => theme.fontFamily};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  cursor: pointer;
  padding: 0;
  margin-bottom: 1.25rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.7;
  }
`;
