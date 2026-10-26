/**
 * stores/authStore.js — Authentication state (Zustand).
 *
 * Proposal ref: §5.1, §8.2, §11 (state management). Owns auth session state
 * and exposes async actions that delegate to the auth service. Screens read
 * `status`/`user` and call actions; they do not call Firebase directly.
 *
 * `status` values:
 *   - 'initializing' — session bootstrap in progress (app start)
 *   - 'signedIn'     — an authenticated user is present
 *   - 'signedOut'    — no authenticated user
 */

import { create } from 'zustand';

import * as authService from '../services/firebase/auth';

/**
 * Guards against attaching more than one Auth listener across fast refresh
 * or repeated bootstrap calls.
 * @type {null | (() => void)}
 */
let unsubscribeAuthListener = null;

export const useAuthStore = create((set, get) => ({
  user: null,
  status: 'initializing',
  error: null,
  actionPending: false,

  /**
   * Subscribes to Firebase auth state and reflects it into the store. Safe to
   * call more than once; only one listener is kept. Idempotent so app-start
   * bootstrap and fast refresh do not stack listeners.
   * @returns {() => void} unsubscribe
   */
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

  /** Removes the auth listener (used on unmount / sign-out teardown). */
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

  /** Clears the last displayed auth error (e.g. when leaving a form). */
  clearError: () => set({ error: null }),

  /** @returns {Promise<string|null>} the current Firebase ID token, or null. */
  getIdToken: () => (get().user ? authService.getIdToken() : Promise.resolve(null)),
}));

export default useAuthStore;
