import styled from 'styled-components';

export const ThemeSelectWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const StyledSelect = styled.select`
  appearance: none;
  background: ${({ theme }) => theme.colors.bgCard};
  color: ${({ theme }) => theme.colors.textPrimary};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 0.35rem 1.75rem 0.35rem 0.75rem;
  font-size: ${({ theme }) => theme.fonts.sizeSm};
  font-family: inherit;
  font-weight: ${({ theme }) => theme.fonts.weightMedium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderColorHover};
    background: ${({ theme }) => theme.colors.bgCardHover};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accentPrimary};
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }
`;

export const SelectIcon = styled.div`
  position: absolute;
  right: 0.5rem;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};

  svg {
    width: 14px;
    height: 14px;
  }
`;
