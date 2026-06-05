import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { cn } from '@/lib/utils';
import useChatStore from '@/store/chatStore';
import api from '@/utils/api';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Chat from './Chat';
import SideBar from './SideBar';

export default function ChatLayout({
  defaultLayout = [320, 480],
  defaultCollapsed = false,
  navCollapsedSize,
}) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const selectedChat = useChatStore((state) => state.selectedChat);
  const [isMobile, setIsMobile] = useState(false);
  const setHistory = useChatStore((state) => state.setHistory);

  useQuery({
    queryKey: ['chat-history', selectedChat?._id || ''],
    queryFn: async () => {
      const { data } = await api.get(`/chat/${selectedChat?._id}/history`);
      setHistory(data);

      return data;
    },
    enabled: !!selectedChat?._id,
  });

  useEffect(() => {
    const checkScreenWidth = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
        setIsCollapsed(true);
      }
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkScreenWidth();

    // Event listener for screen width changes
    window.addEventListener('resize', checkScreenWidth);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', checkScreenWidth);
    };
  }, []);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(
          sizes,
        )}`;
      }}
      className="h-full items-stretch"
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={navCollapsedSize}
        collapsible={true}
        minSize={isMobile ? 0 : 24}
        maxSize={isMobile ? 8 : 30}
        onCollapse={() => {
          setIsCollapsed(true);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            true,
          )}`;
        }}
        onExpand={() => {
          setIsCollapsed(false);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            false,
          )}`;
        }}
        className={cn(
          isCollapsed &&
            'min-w-[50px] md:min-w-[70px] transition-all duration-300 ease-in-out',
        )}
      >
        <SideBar isCollapsed={isCollapsed || isMobile} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
        <Chat />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
