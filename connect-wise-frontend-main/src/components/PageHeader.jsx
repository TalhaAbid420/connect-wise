import useUserStore from '@/store/userStore';
import { Link } from 'react-router-dom';
import AuthButtons from './AuthButtons';
import MagnetIcon from './MagnetIcon';

function PageHeader() {
  const user = useUserStore((state) => state.user);

  return (
    <header className="container py-4 px-4 md:px-6 flex items-center justify-between">
      <Link
        className="flex items-center"
        to={
          user
            ? user?.role == 'mentor'
              ? '/mentor/dashboard'
              : '/dashboard'
            : '/'
        }
      >
        <MagnetIcon className="h-6 w-6" />
        <span className="ml-2 text-xl font-bold">ConnectWise</span>
      </Link>
      <nav className="hidden lg:flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          to="/#browse-mentors"
        >
          Find Mentor
        </Link>

        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          to="/become-mentor"
        >
          Become Mentor
        </Link>

        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          to="/about"
        >
          About Us
        </Link>
      </nav>

      <AuthButtons />
    </header>
  );
}

export default PageHeader;
