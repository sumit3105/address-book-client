import styled from 'styled-components';

export const ThemeSelectWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const StyledSelect = styled.select`
  appearance: none;
  background: ${({ theme }) => theme.color.card.basic.bg.regular};
  color: ${({ theme }) => theme.color.text.primary};
  border: ${({ theme }) => theme.borderSize.regular} solid ${({ theme }) => theme.color.border.primary};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: 0.35rem 1.75rem 0.35rem 0.75rem;
  font-size: ${({ theme }) => theme.fontSize.subText};
  font-family: inherit;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.color.border.active};
    background: ${({ theme }) => theme.color.bg.menu.hover};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.color.primary};
    box-shadow: ${({ theme }) => theme.color.shadow.regular};
  }
`;

export const SelectIcon = styled.div`
  position: absolute;
  right: 0.5rem;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.color.text.regular};

  svg {
    width: 14px;
    height: 14px;
  }
`;
