import styled from 'styled-components';

export const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.75rem;
  height: 56px;
  background: ${({ theme }) => theme.color.bg.secondary};
  border-bottom: ${({ theme }) => theme.borderSize.regular} solid ${({ theme }) => theme.color.border.primary};
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

export const LogoIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: ${({ theme }) => theme.color.primary};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: 0.75rem;
  font-weight: 700;
  color: white;
  letter-spacing: -0.03em;
`;

export const LogoText = styled.span`
  font-size: ${({ theme }) => theme.fontSize.subText};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.color.text.primary};
  letter-spacing: -0.01em;
`;

export const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const UserBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 0.75rem;
  background: ${({ theme }) => theme.color.card.basic.bg.regular};
  border: ${({ theme }) => theme.borderSize.regular} solid ${({ theme }) => theme.color.border.primary};
  border-radius: 99px;
  font-size: ${({ theme }) => theme.fontSize.subText};
  color: ${({ theme }) => theme.color.text.regular};
`;

export const UserAvatar = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: ${({ theme }) => theme.color.bg.menu.hover};
  border: ${({ theme }) => theme.borderSize.regular} solid ${({ theme }) => theme.color.border.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  font-weight: 600;
  color: ${({ theme }) => theme.color.text.regular};
`;

export const MainContent = styled.main`
  flex: 1;
  padding: 1.75rem 2rem;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;
