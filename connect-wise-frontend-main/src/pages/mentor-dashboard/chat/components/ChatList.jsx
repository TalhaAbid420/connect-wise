import LoadingIcon from '@/components/LoaderIcon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import useChatStore from '@/store/chatStore';
import useUserStore from '@/store/userStore';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import ChatBottomBar from './ChatBottomBar';

export default function ChatList() {
  const messagesContainerRef = useRef(null);
  const user = useUserStore((state) => state.user);
  const history = useChatStore((state) => state.history);
  const selectedChat = useChatStore((state) => state.selectedChat);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  });

  if (!selectedChat) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p className="text-gray-400 text-lg">Select a chat to start</p>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="flex w-full justify-center items-center h-full">
        <LoadingIcon />
      </div>
    );
  }

  return (
    <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
      <div
        ref={messagesContainerRef}
        className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col scroll-styles"
        id="messages-container"
      >
        <AnimatePresence>
          {history?.map((message, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
              transition={{
                opacity: { duration: 0.1 },
                layout: {
                  type: 'spring',
                  bounce: 0.3,
                  duration: 10 * 0.05 + 0.2,
                },
              }}
              style={{
                originX: 0.5,
                originY: 0.5,
              }}
              className={cn(
                'flex flex-col gap-2 p-4 whitespace-pre-wrap',
                message.by === user._id ? 'items-end' : 'items-start',
              )}
            >
              <div className="flex gap-3 items-start">
                {message.by !== user._id && (
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage
                      src={selectedChat?.user?.avatar}
                      alt={selectedChat?.user?.fullName}
                      width={6}
                      height={6}
                    />
                    <AvatarFallback>
                      {selectedChat?.user?.firstName?.charAt(0).toUpperCase() +
                        selectedChat?.user?.lastName?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                )}
                <span className=" bg-accent p-3 rounded-md max-w-xs text-wrap break-all">
                  {message.message}
                </span>
                {message.by === user._id && (
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage
                      src={user.avatar}
                      alt={message.name}
                      width={6}
                      height={6}
                    />
                    <AvatarFallback>
                      {user?.firstName?.charAt(0).toUpperCase() +
                        user?.lastName?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <ChatBottomBar chatID={selectedChat._id} />
    </div>
  );
}
