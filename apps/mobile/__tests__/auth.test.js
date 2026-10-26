/**
 * Auth service and store tests. Firebase is mocked; no real credentials.
 */
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from 'firebase/auth';

import { toAuthError, toAuthUser, sendPasswordReset } from '../src/services/firebase/auth';
import { useAuthStore } from '../src/stores/authStore';

jest.mock('../src/services/firebase/client', () => ({
  getFirebaseAuth: jest.fn(() => ({ currentUser: null })),
}));

jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
  updateProfile: jest.fn(),
  onAuthStateChanged: jest.fn(),
}));

const fakeUser = { uid: 'u1', email: 'a@b.com', displayName: 'Ananda' };

describe('auth service error mapping', () => {
  it('maps a known Firebase code to a safe user-facing message', () => {
    const err = new Error('Firebase: raw message');
    err.code = 'auth/invalid-credential';
    const safe = toAuthError(err);
    expect(safe.message).toBe('Incorrect email or password.');
    expect(safe.code).toBe('auth/invalid-credential');
    expect(safe.message).not.toMatch(/Firebase:/);
  });

  it('falls back to a generic message for unknown codes', () => {
    const err = new Error('boom');
    err.code = 'auth/some-new-code';
    expect(toAuthError(err).message).toBe('Something went wrong. Please try again.');
  });

  it('normalizes a user and handles null', () => {
    expect(toAuthUser(fakeUser)).toEqual({ uid: 'u1', email: 'a@b.com', displayName: 'Ananda' });
    expect(toAuthUser(null)).toBeNull();
  });
});

describe('authStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAuthStore.setState({
      user: null,
      status: 'initializing',
      error: null,
      actionPending: false,
    });
    useAuthStore.getState().teardown();
  });

  it('bootstrap subscribes and reflects signed-in state', () => {
    let emit;
    onAuthStateChanged.mockImplementation((_auth, cb) => {
      emit = cb;
      return () => {};
    });

    useAuthStore.getState().bootstrap();
    emit(fakeUser);

    expect(useAuthStore.getState().status).toBe('signedIn');
    expect(useAuthStore.getState().user).toEqual(fakeUser);
  });

  it('bootstrap reflects signed-out state', () => {
    let emit;
    onAuthStateChanged.mockImplementation((_auth, cb) => {
      emit = cb;
      return () => {};
    });

    useAuthStore.getState().bootstrap();
    emit(null);

    expect(useAuthStore.getState().status).toBe('signedOut');
    expect(useAuthStore.getState().user).toBeNull();
  });

  it('login success sets signedIn and clears error', async () => {
    signInWithEmailAndPassword.mockResolvedValue({ user: fakeUser });

    await useAuthStore.getState().login({ email: 'a@b.com', password: 'secret1' });

    expect(useAuthStore.getState().status).toBe('signedIn');
    expect(useAuthStore.getState().error).toBeNull();
  });

  it('login failure stores a safe error and rethrows', async () => {
    const err = new Error('raw');
    err.code = 'auth/wrong-password';
    signInWithEmailAndPassword.mockRejectedValue(err);

    await expect(
      useAuthStore.getState().login({ email: 'a@b.com', password: 'bad' }),
    ).rejects.toThrow('Incorrect email or password.');
    expect(useAuthStore.getState().error).toBe('Incorrect email or password.');
    expect(useAuthStore.getState().status).not.toBe('signedIn');
  });

  it('register passes displayName and signs in', async () => {
    createUserWithEmailAndPassword.mockResolvedValue({ user: fakeUser });

    await useAuthStore.getState().register({
      email: 'a@b.com',
      password: 'secret1',
      displayName: 'Ananda',
    });

    expect(createUserWithEmailAndPassword).toHaveBeenCalled();
    expect(useAuthStore.getState().status).toBe('signedIn');
  });

  it('logout clears the user', async () => {
    useAuthStore.setState({ user: fakeUser, status: 'signedIn' });
    fbSignOut.mockResolvedValue();

    await useAuthStore.getState().logout();

    expect(useAuthStore.getState().status).toBe('signedOut');
    expect(useAuthStore.getState().user).toBeNull();
  });

  it('clearError resets the stored error', () => {
    useAuthStore.setState({ error: 'boom' });
    useAuthStore.getState().clearError();
    expect(useAuthStore.getState().error).toBeNull();
  });

  it('getIdToken resolves to null when signed out', async () => {
    useAuthStore.setState({ user: null });
    await expect(useAuthStore.getState().getIdToken()).resolves.toBeNull();
  });
});

describe('sendPasswordReset', () => {
  beforeEach(() => jest.clearAllMocks());

  it('resolves silently when the account does not exist', async () => {
    const err = new Error('no user');
    err.code = 'auth/user-not-found';
    sendPasswordResetEmail.mockRejectedValue(err);

    await expect(sendPasswordReset('nobody@b.com')).resolves.toBeUndefined();
  });

  it('rethrows a safe error for other failures', async () => {
    const err = new Error('raw');
    err.code = 'auth/invalid-email';
    sendPasswordResetEmail.mockRejectedValue(err);

    await expect(sendPasswordReset('bad')).rejects.toThrow('Enter a valid email address.');
  });
});
