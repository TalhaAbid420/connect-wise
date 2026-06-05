import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import api from '@/utils/api';
import { Info, Video } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// const TopbarIcons = [{ icon: Phone }, { icon: Video }, { icon: Info }];

export default function ChatTopBar({ selectedUser, mentorInfo, sendMessage }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleProfileView = (mentor) => {
    navigate(`/profile`, {
      state: { mentor },
    });
  };

  const createMeeting = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const { data } = await api.post('/meeting/create', {
        chatID: selectedUser.id,
      });

      sendMessage({
        chatID: selectedUser.id,
        message: `Meeting link: ${data.url}`,
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
      {selectedUser && (
        <>
          <div className="flex items-center gap-2 relative">
            <Avatar className="flex justify-center items-center">
              <AvatarImage
                src={selectedUser.avatar}
                alt={selectedUser.name}
                width={6}
                height={6}
                className="w-10 h-10 "
              />
              <AvatarFallback>
                {selectedUser?.name?.split(' ')[0][0]}
                {selectedUser?.name?.split(' ')[1][0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">{selectedUser.name}</span>
              {selectedUser?.isOnline && (
                <span className="text-xs">Active</span>
              )}
            </div>
            {/* green dot */}

            <div
              className={`absolute top-0 left-[1.8rem] w-3 h-3 ${
                selectedUser?.isOnline ? 'bg-green-500' : 'bg-slate-500'
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
              <Video size={20} className="text-muted-foreground" />
            </Link>
            <button
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'icon' }),
                'h-9 w-9',
                'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white cursor-pointer',
              )}
              onClick={() => handleProfileView(mentorInfo)}
            >
              <Info size={20} className="text-muted-foreground" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
