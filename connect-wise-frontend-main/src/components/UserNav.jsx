import { Button } from '@/components/custom/Button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useUserStore from '@/store/userStore';
import { onlineManager } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';

export function UserNav() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const logOut = useUserStore((state) => state.logOut);

  const handleLogOut = () => {
    logOut();
    navigate('/', { replace: true, relative: false });
  };

  return (
    <div className="ml-auto flex items-center space-x-4">
      {!user?.isFeatured && (
        <Link
          className="text-sm font-medium hover:underline underline-offset-4 text-transparent bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text"
          to="/pricing"
        >
          + Go Premium
        </Link>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={user?.avatar}
                alt={`Profile picture of ${user?.firstName} ${user?.lastName}.`}
              />
              <AvatarFallback>
                {user?.firstName?.charAt(0).toUpperCase() +
                  user?.lastName?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div
              className={`absolute top-0 left-[1.6rem] w-3 h-3 rounded-full border border-white ${
                onlineManager.isOnline() ? 'bg-green-500' : 'bg-slate-600'
              }`}
            ></div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal cursor-default">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link
              to={
                user?.role === 'mentor'
                  ? '/mentor/dashboard/settings'
                  : '/dashboard/settings'
              }
            >
              <DropdownMenuItem className="hover:cursor-pointer">
                Settings
              </DropdownMenuItem>
            </Link>
            {user?.manageSubscriptions && (
              <Link to={user?.manageSubscriptions}>
                <DropdownMenuItem className="hover:cursor-pointer">
                  Manage Subscription
                </DropdownMenuItem>
              </Link>
            )}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="hover:cursor-pointer"
            onClick={handleLogOut}
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
