import { create } from 'zustand';

import * as authService from '../services/firebase/auth';

let unsubscribeAuthListener = null;

export const useAuthStore = create((set, get) => ({
  user: null,
  status: 'initializing',
  error: null,
  actionPending: false,

  /** Subscribes to auth state changes; keeps only one listener. */
  bootstrap: () => {
    if (unsubscribeAuthListener) {
      return unsubscribeAuthListener;
    }

    unsubscribeAuthListener = authService.subscribeToAuthChanges((user) => {
      set({
        user,
        status: user ? 'signedIn' : 'signedOut',
        error: null,
      });
    });

    return unsubscribeAuthListener;
  },

  teardown: () => {
    if (unsubscribeAuthListener) {
      unsubscribeAuthListener();
      unsubscribeAuthListener = null;
    }
  },

  register: async ({ email, password, displayName }) => {
    set({ actionPending: true, error: null });
    try {
      const user = await authService.register({ email, password, displayName });
      set({ user, status: 'signedIn', actionPending: false });
      return user;
    } catch (error) {
      set({ error: error.message, actionPending: false });
      throw error;
    }
  },

  login: async ({ email, password }) => {
    set({ actionPending: true, error: null });
    try {
      const user = await authService.login({ email, password });
      set({ user, status: 'signedIn', actionPending: false });
      return user;
    } catch (error) {
      set({ error: error.message, actionPending: false });
      throw error;
    }
  },

  logout: async () => {
    set({ actionPending: true, error: null });
    try {
      await authService.logout();
      set({ user: null, status: 'signedOut', actionPending: false });
    } catch (error) {
      set({ error: error.message, actionPending: false });
      throw error;
    }
  },

  clearError: () => set({ error: null }),

  /** @returns {Promise<string|null>} */
  getIdToken: () => (get().user ? authService.getIdToken() : Promise.resolve(null)),
}));

export default useAuthStore;
