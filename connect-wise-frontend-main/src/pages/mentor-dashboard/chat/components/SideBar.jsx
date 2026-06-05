import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { buttonVariants } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import useChatStore from '@/store/chatStore';
import api from '@/utils/api';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

export default function SideBar({ isCollapsed }) {
  const { data, isLoading } = useQuery({
    queryKey: ['chat-list'],
    queryFn: async () => {
      const { data } = await api.get(`/chat/list`);
      return data;
    },
  });

  const setSelectedChat = useChatStore((state) => state.setSelectedChat);
  const selectedChat = useChatStore((state) => state.selectedChat);

  return !isLoading ? (
    <div
      data-collapsed={isCollapsed}
      className="relative group flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2 "
    >
      {!isCollapsed && (
        <div className="flex justify-between p-2 items-center">
          <div className="flex gap-2 items-center text-2xl">
            <p className="font-medium">Chats</p>
            <span className="text-zinc-300">({data.length})</span>
          </div>
        </div>
      )}
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {data.map((chat, index) => {
          chat.variant = selectedChat?._id === chat._id ? 'gray' : 'ghost';
          return isCollapsed ? (
            <TooltipProvider key={index}>
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    to="#"
                    className={cn(
                      buttonVariants({ variant: chat.variant, size: 'icon' }),
                      'h-11 w-11 md:h-16 md:w-16',
                      chat.variant === 'grey' &&
                        'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white',
                      ' p-2',
                    )}
                    onClick={() => setSelectedChat(chat)}
                  >
                    <div className="relative">
                      <Avatar className="flex justify-center items-center">
                        <AvatarImage
                          src={chat.user.avatar}
                          alt={chat.user.avatar}
                          width={6}
                          height={6}
                          className="w-10 h-10 "
                        />
                        <AvatarFallback>
                          {chat.user.firstName[0]}
                          {chat.user.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      {/* green dot */}
                      <div
                        className={`absolute top-0 left-[1.8rem] w-3 h-3 ${
                          chat.isOnline ? 'bg-green-500' : 'bg-slate-500'
                        }  rounded-full border border-white`}
                      ></div>
                    </div>{' '}
                    <span className="sr-only">{chat.user.fullName}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {chat.user.fullName}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Link
              key={index}
              to="#"
              className={cn(
                buttonVariants({ variant: chat.variant, size: 'xl' }),
                chat.variant === 'grey' &&
                  'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white shrink',
                'justify-start gap-4 p-2',
              )}
              onClick={() => setSelectedChat(chat)}
            >
              <div className="relative">
                <Avatar className="flex justify-center items-center">
                  <AvatarImage
                    src={chat.user.avatar}
                    alt={chat.user.avatar}
                    width={6}
                    height={6}
                    className="w-10 h-10 "
                  />
                  <AvatarFallback>
                    {chat.user.firstName[0]}
                    {chat.user.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                {/* green dot */}
                <div
                  className={`absolute top-0 left-[1.8rem] w-3 h-3 ${
                    chat.isOnline ? 'bg-green-500' : 'bg-slate-500'
                  }  rounded-full border border-white`}
                ></div>
              </div>
              <div className="flex flex-col max-w-28">
                <span>{chat.user.fullName}</span>
                {
                  <span className="text-zinc-300 text-xs truncate ">
                    {chat.lastMessage.message}
                  </span>
                }
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  ) : (
    <></>
  );
}
