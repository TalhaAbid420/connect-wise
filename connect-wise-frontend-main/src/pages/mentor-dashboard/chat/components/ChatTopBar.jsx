import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import useChatStore from '@/store/chatStore';
import api from '@/utils/api';
import { Video as VideoIcon } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ChatTopBar() {
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useChatStore((state) => state.sendMessage);
  const selectedChat = useChatStore((state) => state.selectedChat);

  const createMeeting = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const { data } = await api.post('/meeting/create', {
        chatID: selectedChat._id,
      });

      sendMessage({
        chatID: selectedChat._id,
        message: `Meeting link: ${data.url}`,
        date: new Date().toISOString(),
      });

      window.open(data.url, '_blank').focus();
    } catch (error) {
      console.log('Error creating meeting:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-20 flex p-4 justify-between items-center border-b">
      {selectedChat && (
        <>
          <div className="flex items-center gap-2 relative">
            <Avatar className="flex justify-center items-center">
              <AvatarImage
                src={selectedChat?.user?.avatar}
                alt={selectedChat?.user?.fullName}
                width={6}
                height={6}
                className="w-10 h-10 "
              />
              <AvatarFallback>
                {selectedChat?.user?.firstName[0]}
                {selectedChat?.user?.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">
                {selectedChat?.user?.fullName}
              </span>
              {selectedChat?.isOnline && (
                <span className="text-xs">Active</span>
              )}
            </div>

            <div
              className={`absolute top-0 left-[1.8rem] w-3 h-3 ${
                selectedChat?.isOnline ? 'bg-green-500' : 'bg-slate-500'
              }  rounded-full border border-white`}
            ></div>
          </div>

          <div className="flex row gap-1">
            <Link
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'icon' }),
                'h-9 w-9',
                'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white',
              )}
              onClick={createMeeting}
            >
              <VideoIcon size={20} className="text-muted-foreground" />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
