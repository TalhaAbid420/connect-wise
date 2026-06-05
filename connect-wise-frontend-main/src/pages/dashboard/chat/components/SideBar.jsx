import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { buttonVariants } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export default function SideBar({ users, isCollapsed, onSelect }) {
  return (
    <div
      data-collapsed={isCollapsed}
      className="relative group flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2 "
    >
      {!isCollapsed && (
        <div className="flex justify-between p-2 items-center">
          <div className="flex gap-2 items-center text-2xl">
            <p className="font-medium">Chats</p>
            <span className="text-zinc-300">({users.length})</span>
          </div>

          {/* <div>
            <Link
              to="#"
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'icon' }),
                'h-9 w-9',
              )}
            >
              <MoreHorizontal size={20} />
            </Link>

            <Link
              to="#"
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'icon' }),
                'h-9 w-9',
              )}
            >
              <SquarePen size={20} />
            </Link>
          </div> */}
        </div>
      )}
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {users.map((user, index) =>
          isCollapsed ? (
            <TooltipProvider key={index}>
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    to="#"
                    className={cn(
                      buttonVariants({ variant: user.variant, size: 'icon' }),
                      'h-11 w-11 md:h-16 md:w-16',
                      user.variant === 'grey' &&
                        'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white',
                      ' p-2',
                    )}
                    onClick={() => onSelect(user)}
                  >
                    <div className="relative">
                      <Avatar className="flex justify-center items-center">
                        <AvatarImage
                          src={user.avatar}
                          alt={user.avatar}
                          width={6}
                          height={6}
                          className="w-10 h-10 "
                        />
                        <AvatarFallback>
                          {user?.name?.split(' ')[0][0]}
                          {user?.name?.split(' ')[1][0]}
                        </AvatarFallback>
                      </Avatar>
                      {/* green dot */}
                      <div
                        className={`absolute top-0 left-[1.8rem] w-3 h-3 ${
                          user?.isOnline ? 'bg-green-500' : 'bg-slate-500'
                        }  rounded-full border border-white`}
                      ></div>
                    </div>{' '}
                    <span className="sr-only">{user.name}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {user.name}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Link
              key={index}
              to="#"
              className={cn(
                buttonVariants({ variant: user.variant, size: 'xl' }),
                user.variant === 'grey' &&
                  'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white shrink',
                'justify-start gap-4 p-2',
              )}
              onClick={() => onSelect(user)}
            >
              <div className="relative">
                <Avatar className="flex justify-center items-center">
                  <AvatarImage
                    src={user.avatar}
                    alt={user.avatar}
                    width={6}
                    height={6}
                    className="w-10 h-10 "
                  />
                  <AvatarFallback>
                    {user?.name?.split(' ')[0][0]}
                    {user?.name?.split(' ')[1][0]}
                  </AvatarFallback>
                </Avatar>
                {/* green dot */}
                <div
                  className={`absolute top-0 left-[1.8rem] w-3 h-3 ${
                    user?.isOnline ? 'bg-green-500' : 'bg-slate-500'
                  }  rounded-full border border-white`}
                ></div>
              </div>
              <div className="flex flex-col max-w-28">
                <span>{user.name}</span>
                {user.messages.length > 0 && (
                  <span className="text-zinc-300 text-xs truncate ">
                    {user.messages[user.messages.length - 1].message}
                  </span>
                )}
              </div>
            </Link>
          ),
        )}
      </nav>
    </div>
  );
}
