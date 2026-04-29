import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// ========================
// Page Layout
// ========================
export const DashboardWrapper = styled.div`
  animation: ${fadeIn} 0.3s ease;
  font-family: ${({ theme }) => theme.fontFamily};
`;

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

export const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.sectionHeader};
  font-weight: ${({ theme }) => theme.fontWeight.boldX};
  color: ${({ theme }) => theme.color.text.header};
  letter-spacing: -0.02em;
  font-family: ${({ theme }) => theme.fontFamily};
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

// ========================
// Stats Bar
// ========================
export const StatsBar = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

// ========================
// Filter Bar
// ========================
export const FilterBar = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
  align-items: flex-end;
`;

export const FilterFieldWrapper = styled.div`
  flex: 1;
  min-width: 140px;
  max-width: 220px;
`;

export const SearchFieldWrapper = styled.div`
  flex: 2;
  min-width: 220px;
`;

// ========================
// Table Card
// ========================
export const TableCard = styled.div`
  background: ${({ theme }) => theme.color.card.basic.bg.regular};
  border: ${({ theme }) => theme.borderSize.regular} solid ${({ theme }) => theme.color.border.primary};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: 0 2px 8px ${({ theme }) => theme.color.shadow.regular};
`;

// ========================
// Pagination
// ========================
export const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-top: ${({ theme }) => theme.borderSize.regular} solid ${({ theme }) => theme.color.border.primary};
  flex-wrap: wrap;
  gap: 0.75rem;
`;

export const PaginationInfo = styled.span`
  font-size: ${({ theme }) => theme.fontSize.subText};
  color: ${({ theme }) => theme.color.text.disabled};
  font-family: ${({ theme }) => theme.fontFamily};
`;

export const PaginationButtons = styled.div`
  display: flex;
  gap: 0.25rem;
  align-items: center;
`;

export const PageBtn = styled.button<{ $active?: boolean }>`
  min-width: 32px;
  height: 32px;
  padding: 0 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  border: ${({ theme }) => theme.borderSize.regular} solid
    ${({ $active, theme }) => ($active ? theme.color.primary : theme.color.border.primary)};
  background: ${({ $active, theme }) =>
    $active ? theme.color.primary : theme.color.card.basic.bg.regular};
  color: ${({ $active, theme }) =>
    $active ? theme.color.text.inverted : theme.color.text.regular};
  font-size: ${({ theme }) => theme.fontSize.subText};
  font-family: ${({ theme }) => theme.fontFamily};
  font-weight: ${({ $active, theme }) =>
    $active ? theme.fontWeight.bold : theme.fontWeight.regular};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.color.bg.menu.hover};
    border-color: ${({ theme }) => theme.color.border.active};
  }
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;
