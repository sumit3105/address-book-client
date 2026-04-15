import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const DashboardWrapper = styled.div`
  animation: ${fadeIn} 0.3s ease;
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
  font-size: ${({ theme }) => theme.fonts.size2xl};
  font-weight: ${({ theme }) => theme.fonts.weightSemibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  letter-spacing: -0.02em;
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

// ========================
// Filter Bar
// ========================

export const FilterBar = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
  align-items: flex-end;
`;

export const SearchWrapper = styled.div`
  position: relative;
  flex: 1;
  min-width: 220px;
`;

export const SearchIcon = styled.span`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.85rem;
  pointer-events: none;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.575rem 0.875rem 0.575rem 2.25rem;
  background: ${({ theme }) => theme.colors.bgInput};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.fonts.family};
  font-size: ${({ theme }) => theme.fonts.sizeSm};
  outline: none;
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderColorHover};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.borderColorFocus};
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }
`;

export const FilterSelect = styled.select`
  padding: 0.575rem 2rem 0.575rem 0.875rem;
  background: ${({ theme }) => theme.colors.bgInput};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.fonts.family};
  font-size: ${({ theme }) => theme.fonts.sizeSm};
  outline: none;
  cursor: pointer;
  appearance: none;
  min-width: 110px;
  transition: border-color ${({ theme }) => theme.transitions.fast};
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666666' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.625rem center;

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderColorHover};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.borderColorFocus};
  }

  option {
    background: ${({ theme }) => theme.colors.bgSecondary};
  }
`;

export const FilterInput = styled.input`
  padding: 0.575rem 0.875rem;
  background: ${({ theme }) => theme.colors.bgInput};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.fonts.family};
  font-size: ${({ theme }) => theme.fonts.sizeSm};
  outline: none;
  min-width: 110px;
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderColorHover};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.borderColorFocus};
  }
`;

// ========================
// Table
// ========================

export const TableCard = styled.div`
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.radii.xl};
  overflow: hidden;
`;

export const TableWrapper = styled.div`
  overflow-x: auto;

  &::-webkit-scrollbar { height: 4px; }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.10);
    border-radius: 99px;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  white-space: nowrap;
`;

export const Thead = styled.thead`
  background: ${({ theme }) => theme.colors.bgSecondary};
`;

export const Th = styled.th`
  text-align: left;
  padding: 0.75rem 1.125rem;
  font-size: ${({ theme }) => theme.fonts.sizeXs};
  font-weight: ${({ theme }) => theme.fonts.weightMedium};
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
`;

export const Tbody = styled.tbody``;

export const Tr = styled.tr`
  transition: background ${({ theme }) => theme.transitions.fast};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.bgCardHover};
  }
`;

export const Td = styled.td`
  padding: 0.75rem 1.125rem;
  font-size: ${({ theme }) => theme.fonts.sizeSm};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.25rem;
`;

export const ActionBtn = styled.button<{ $variant?: 'view' | 'edit' | 'delete' }>`
  background: none;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radii.sm};
  padding: 0.3rem 0.5rem;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  color: ${({ theme }) => theme.colors.textMuted};

  &:hover {
    color: ${({ $variant, theme }) =>
      $variant === 'view'
        ? theme.colors.info
        : $variant === 'edit'
          ? theme.colors.accentPrimary
          : $variant === 'delete'
            ? theme.colors.danger
            : theme.colors.textPrimary};
    background: ${({ $variant }) =>
      $variant === 'view'
        ? 'rgba(79, 142, 247, 0.10)'
        : $variant === 'edit'
          ? 'rgba(79, 142, 247, 0.08)'
          : $variant === 'delete'
            ? 'rgba(224, 82, 82, 0.10)'
            : 'transparent'};
    border-color: ${({ $variant }) =>
      $variant === 'view'
        ? 'rgba(79, 142, 247, 0.20)'
        : $variant === 'edit'
          ? 'rgba(79, 142, 247, 0.16)'
          : $variant === 'delete'
            ? 'rgba(224, 82, 82, 0.20)'
            : 'transparent'};
  }
`;

// ========================
// Pagination
// ========================

export const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem 1.125rem;
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const PaginationInfo = styled.span`
  font-size: ${({ theme }) => theme.fonts.sizeSm};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const PaginationButtons = styled.div`
  display: flex;
  gap: 0.25rem;
`;

export const PageBtn = styled.button<{ $active?: boolean }>`
  padding: 0.35rem 0.65rem;
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.accentPrimary : theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.accentPrimary : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? '#fff' : theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fonts.sizeSm};
  font-family: ${({ theme }) => theme.fonts.family};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.accentPrimary};
    color: ${({ $active }) => ($active ? '#fff' : 'inherit')};
    background: ${({ $active, theme }) =>
      $active ? theme.colors.accentPrimary : theme.colors.accentSubtle};
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

// ========================
// Empty State
// ========================

export const EmptyState = styled.div`
  text-align: center;
  padding: 3.5rem 2rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const EmptyIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 0.875rem;
  opacity: 0.4;
`;

export const EmptyTitle = styled.h3`
  font-size: ${({ theme }) => theme.fonts.sizeLg};
  font-weight: ${({ theme }) => theme.fonts.weightMedium};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0.375rem;
`;

export const EmptyText = styled.p`
  font-size: ${({ theme }) => theme.fonts.sizeSm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 1.5rem;
`;

// ========================
// Stats
// ========================

export const StatsBar = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
`;

export const StatCard = styled.div`
  flex: 1;
  min-width: 130px;
  padding: 1rem 1.125rem;
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.radii.lg};
  transition: border-color ${({ theme }) => theme.transitions.base};

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderColorHover};
  }
`;

export const StatValue = styled.div`
  font-size: ${({ theme }) => theme.fonts.size2xl};
  font-weight: ${({ theme }) => theme.fonts.weightSemibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  letter-spacing: -0.03em;
`;

export const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizeXs};
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-top: 0.2rem;
`;
