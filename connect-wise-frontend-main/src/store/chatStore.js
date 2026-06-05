import api from '@/utils/api';
import { decodeJWT, getTokenCookie } from '@/utils/helpers';
import { queryClient } from '@/utils/reactQuery';
import { create } from 'zustand';

const useChatStore = create((set, get) => ({
  history: [],
  setHistory: (data) => set({ history: data }),

  selectedChat: null,
  setSelectedChat: (data) => set({ selectedChat: data }),

  userInfo: decodeJWT(getTokenCookie()),

  sendMessage: async (data) => {
    const { message, date, chatID } = data;
    const prevMessages = get()?.history || [];
    try {
      const updatedMessages = [
        ...prevMessages,
        {
          by: get().userInfo.id,
          message,
          createdAt: date,
        },
      ];
      set({ history: updatedMessages });
      await api.post(`/chat/message`, data);
    } catch {
      set({ history: prevMessages });
    } finally {
      queryClient.invalidateQueries(['chat-history', chatID]);
    }
  },
}));

export default useChatStore;
