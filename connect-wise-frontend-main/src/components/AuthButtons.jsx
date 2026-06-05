import useUserStore from '@/store/userStore';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

function AuthButtons() {
  const user = useUserStore((state) => state.user);
  const logOut = useUserStore((state) => state.logOut);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut();
    navigate('/', { replace: true, relative: false });
  };

  return (
    <div>
      {user ? (
        <>
          <Link
            to={user?.role == 'mentor' ? '/mentor/dashboard' : '/dashboard'}
          >
            <Button variant="ghost">Dashboard</Button>
          </Link>
          <Button onClick={handleLogOut} variant="ghost">
            Sign Out
          </Button>
        </>
      ) : (
        <>
          <Link to="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <span className="mx-1">/</span>
          <Link to="/register">
            <Button variant="ghost">Register</Button>
          </Link>
        </>
      )}
    </div>
  );
}
export default AuthButtons;
