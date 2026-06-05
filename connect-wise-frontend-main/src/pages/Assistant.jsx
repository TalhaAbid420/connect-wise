import { AIChat } from '@/components/AIChat';
import { Layout } from '@/components/custom/Layout';
import LoadingMessage from '@/components/LoadingMessage';
import { UserNav } from '@/components/UserNav';
import api from '@/utils/api';
import { parse, stringify } from 'flatted';
import { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

export default function Assistant() {
  const [messages, setMessages] = useState(
    sessionStorage.getItem('messages')
      ? parse(sessionStorage.getItem('messages'))
      : [],
  );
  const [isLoading, setIsLoading] = useState(true);

  useQuery(
    'assistant',
    async () => {
      setMessages([['ai', <LoadingMessage key="assistant-loading" />]]);
      const { data } = await api.post('/chat/assistant');
      setMessages([['ai', data.content]]);
      setIsLoading(false);
      return data;
    },
    {
      enabled: messages.length === 0,
    },
  );

  const handleSendMessage = useCallback(
    async (message) => {
      if (isLoading) return;
      if (!message.trim()) return;
      setIsLoading(true);
      try {
        setMessages((prev) => [
          ...prev,
          ['human', message],
          ['ai', <LoadingMessage key="assistant-loading" />],
        ]);

        const { data } = await api.post('/chat/assistant', {
          chat: messages,
          message,
        });

        setMessages((prev) => {
          const messages = [...prev];
          messages.pop();
          messages.push(['ai', data.content]);
          return messages;
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages],
  );

  useEffect(() => {
    //persist messages in session storage
    if (Array.isArray(messages) && messages?.length > 0) {
      sessionStorage.setItem('messages', stringify(messages));
    }
  }, [messages]);

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header sticky>
        <h1 className="text-2xl font-bold tracking-tight">AI Assistant</h1>
        <UserNav />
      </Layout.Header>

      <Layout.Body>
        <div className="flex h-[calc(78dvh)] flex-col items-start justify-start ">
          <div className="z-10 relative border rounded-lg w-full h-full text-sm lg:flex">
            <AIChat messages={messages} sendMessage={handleSendMessage} />
          </div>
        </div>
      </Layout.Body>
    </Layout>
  );
}
