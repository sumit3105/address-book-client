import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/authSlice';
import { ApplicationHeader } from '@vision-ui/components/components/ApplicationHeader';
import { Button } from '@vision-ui/components/elements/Button';
import { MainContent } from './Layout.styles';

const Layout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const userName = user?.email?.split('@')[0] || 'User';

  return (
    <>
      <ApplicationHeader
        orgName="AddressBook"
        programName="Contacts"
        userName={userName}
        hideNotification={true}
        actionsList={() => (
          <Button
            label="Sign Out"
            type="transparent"
            action="regular"
            size="small"
            onClick={handleLogout}
          />
        )}
      />
      <MainContent>
        <Outlet />
      </MainContent>
    </>
  );
};

export default Layout;
