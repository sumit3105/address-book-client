import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/store/hooks';
import { logout } from '@/store/authSlice';
import Button from '@/components/common/Button';
import ThemeToggle from '@/components/common/ThemeToggle';
import {
  LayoutWrapper,
  Navbar,
  Logo,
  LogoIcon,
  LogoText,
  NavActions,
  MainContent,
} from './Layout.styles';

const Layout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <LayoutWrapper>
      <Navbar>
        <Logo onClick={() => navigate('/')}>
          <LogoIcon>AB</LogoIcon>
          <LogoText>AddressBook</LogoText>
        </Logo>
        <NavActions>
          <ThemeToggle />
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            Sign Out
          </Button>
        </NavActions>
      </Navbar>
      <MainContent>
        <Outlet />
      </MainContent>
    </LayoutWrapper>
  );
};

export default Layout;
