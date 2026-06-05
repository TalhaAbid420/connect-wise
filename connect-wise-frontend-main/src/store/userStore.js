import api from '@/utils/api';
import {
  decodeJWT,
  getTokenCookie,
  removeTokenCookie,
  setTokenCookie,
} from '@/utils/helpers';
import { create } from 'zustand';

const useUserStore = create((set, get) => ({
  user: null,
  isLoading: false,
  login: async (token, signal) => {
    try {
      setTokenCookie(token);
      const { data } = await api.get('/info/me', {
        signal: signal,
      });
      if (!data) {
        set({ user: null });
      }
      set({ user: data });
    } catch (err) {
      console.error(err);
      if (
        err.response &&
        err.response.status >= 400 &&
        err.response.status < 500
      ) {
        removeTokenCookie();
      }
    }
  },
  logOut: () => {
    set({ user: null });
    removeTokenCookie();
  },
  refresh: async (signal) => {
    try {
      set({ isLoading: true });
      if (get().user) return;
      const token = getTokenCookie();
      const decode = decodeJWT(token);
      const isExpire = decode && Date.now() >= decode.exp * 1000;
      if (token && !isExpire) {
        await get().login(token, signal);
      }
    } catch (err) {
      console.error(err);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useUserStore;
