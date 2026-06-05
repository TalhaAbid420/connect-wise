import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { IconSend } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import { SendHorizontal } from 'lucide-react';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import EmojiPicker from './EmojiPicker';

export default function BottomAIChat({ sendMessage }) {
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleThumbsUp = () => {
    sendMessage('👍');
    setMessage('');
  };

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message.trim());
      setMessage('');

      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }

    if (event.key === 'Enter' && event.shiftKey) {
      event.preventDefault();
      setMessage((prev) => prev + '\n');
    }
  };

  return (
    <div className="p-2 flex justify-between w-full items-center gap-2">
      <div className="flex gap-1">
        <div className="flex gap-1">
          <input
            style={{
              display: 'none',
            }}
            accept=".json" // specify the file type that you wanted to accept
            id="choose-file"
            type="file"
          />
          {/* <label
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'icon' }),
              'h-9 w-9',
              'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white hover:cursor-pointer',
            )}
            htmlFor="choose-file"
          >
            <Paperclip size={20} className="text-muted-foreground" />
          </label> */}
        </div>
      </div>

      <AnimatePresence initial={false}>
        <motion.div
          key="input"
          className="w-full relative"
          layout
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{
            opacity: { duration: 0.05 },
            layout: {
              type: 'spring',
              bounce: 0.15,
            },
          }}
        >
          <input
            autoComplete="off"
            value={message}
            ref={inputRef}
            onKeyDown={handleKeyPress}
            onChange={handleInputChange}
            name="message"
            placeholder="Aa"
            className=" w-full border rounded-full flex items-center h-9 resize-none overflow-hidden bg-background px-4"
          ></input>
          <div className="absolute right-2 bottom-1  ">
            <EmojiPicker
              onChange={(value) => {
                setMessage(message + value);
                // if (inputRef.current) {
                //   inputRef.current.focus();
                // }
              }}
            />
          </div>
        </motion.div>

        {message.trim() ? (
          <Link
            to="#"
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'icon' }),
              'h-9 w-9',
              'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0',
            )}
            onClick={handleSend}
          >
            <SendHorizontal size={20} className="text-muted-foreground" />
          </Link>
        ) : (
          <Link
            to="#"
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'icon' }),
              'h-9 w-20',
              'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0',
            )}
            onClick={handleThumbsUp}
          >
            <IconSend size={20} className="text-muted-foreground mr-2" />
            Send
          </Link>
        )}
      </AnimatePresence>
    </div>
  );
}
