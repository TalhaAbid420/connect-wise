import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import useUserStore from '@/store/userStore';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Markdown from 'react-markdown';
import BottomAIChat from './BottomAIChat';
import LoadingMessage from './LoadingMessage';

export function AIChat({ messages, sendMessage, isMobile }) {
  const messagesContainerRef = useRef(null);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
      <div
        ref={messagesContainerRef}
        className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col scroll-styles"
        id="messages-container"
      >
        <AnimatePresence>
          {Array.isArray(messages) &&
            messages?.map((message, index) => {
              return (
                message.length > 1 && (
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
                      message[0] === 'human' ? 'items-end' : 'items-start',
                    )}
                  >
                    <div className="flex gap-3 items-top">
                      {message[0] == 'ai' && (
                        <Avatar className="flex justify-center items-center">
                          <AvatarImage
                            src={'/assets/images/robot.svg'}
                            alt={'AI Assistant'}
                            width={6}
                            height={6}
                          />
                          <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                      )}
                      <span className=" bg-accent px-3 rounded-md max-w-lg">
                        {typeof message[1] === 'string' ? (
                          <Markdown
                            className={'markdown my-1 text-wrap break-words'}
                          >
                            {message[1]}
                          </Markdown>
                        ) : (
                          <span className="my-3 block">
                            <LoadingMessage />
                          </span>
                        )}
                      </span>
                      {message[0] === 'human' && (
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
                )
              );
            })}
        </AnimatePresence>
      </div>
      <BottomAIChat sendMessage={sendMessage} isMobile={isMobile} />
    </div>
  );
}
