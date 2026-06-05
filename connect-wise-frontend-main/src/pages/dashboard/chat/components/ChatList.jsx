import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import useUserStore from '@/store/userStore';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatBottomBar from './ChatBottomBar';

export default function ChatList({
  messages,
  selectedUser,
  mentorInfo,
  sendMessage,
  isMobile,
}) {
  const messagesContainerRef = useRef(null);
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  const handleProfileView = (mentor) => {
    navigate(`/profile`, {
      state: { mentor },
    });
  };

  const handleReview = (mentor) => {
    navigate(`/review`, {
      state: { mentor: { ...mentor, chatID: selectedUser.id } },
    });
  };

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  });

  if (!selectedUser) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p className="text-gray-400 text-lg">Select a chat to start</p>
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
          {messages?.map((message, index) => (
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
                      src={selectedUser.avatar}
                      alt={selectedUser.name}
                      width={6}
                      height={6}
                    />
                    <AvatarFallback>
                      {selectedUser?.name?.split(' ')[0][0].toUpperCase() +
                        selectedUser?.name?.split(' ')[1][0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                )}
                <span className="bg-accent p-3 rounded-md max-w-xs text-wrap break-all">
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
      {/* chat is paused */}
      {selectedUser?.isPaused && (
        <div className="flex flex-col gap-2 my-4 justify-center items-center h-32">
          <p className="text-gray-400 text-lg mr-4">Subscription Expired</p>
          <button
            className="flex items-center gap-2 px-4 py-2 text-white bg-primary rounded-md"
            onClick={() => handleProfileView(mentorInfo)}
          >
            <span>Subscribe Again</span>
          </button>
          <button
            className="mx-auto flex items-center gap-2 px-4 py-2 text-white bg-secondary rounded-md"
            onClick={() => handleReview(mentorInfo)}
          >
            <span>Add Review</span>
          </button>
        </div>
      )}
      {selectedUser && !selectedUser?.isPaused && (
        <ChatBottomBar
          chatID={selectedUser?.id}
          sendMessage={sendMessage}
          isMobile={isMobile}
        />
      )}
    </div>
  );
}
