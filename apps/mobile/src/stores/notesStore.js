/**
 * stores/notesStore.js — Notes list + upload state (Zustand).
 *
 * Proposal ref: §5.3 (notes), §11.1 (offline). Orchestrates the storage,
 * notes-metadata, and cache services. On a failed upload it saves a pending
 * draft locally so nothing is lost silently.
 */

import { create } from 'zustand';

import { uploadNoteFile, deleteNoteFile } from '../services/firebase/storage';
import { createNote, listNotes, getNote, deleteNote } from '../services/firebase/notes';
import {
  cacheNotes,
  getCachedNotes,
  addPendingUpload,
  clearUserCache,
} from '../services/database/cache';

function makeNoteId() {
  return `note_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export const useNotesStore = create((set, get) => ({
  notes: [],
  status: 'idle', // idle | loading | uploading | error
  error: null,
  uploadProgress: 0,
  cursor: null,
  hasMore: false,

  /** Loads notes from cache first, then refreshes from Firestore. */
  load: async (ownerUid) => {
    set({ status: 'loading', error: null });
    try {
      const cached = await getCachedNotes(ownerUid);
      if (cached.length > 0) {
        set({ notes: cached });
      }
      const { notes, cursor } = await listNotes(ownerUid);
      await cacheNotes(ownerUid, notes);
      set({ notes, cursor, hasMore: Boolean(cursor), status: 'idle' });
    } catch (_error) {
      set({ error: 'Could not refresh notes. Showing cached data.', status: 'idle' });
    }
  },

  /** Loads the next page using the stored cursor. */
  loadMore: async (ownerUid) => {
    const { cursor, notes } = get();
    if (!cursor) {
      return;
    }
    set({ status: 'loading' });
    try {
      const page = await listNotes(ownerUid, { cursor });
      const merged = [...notes, ...page.notes];
      await cacheNotes(ownerUid, merged);
      set({ notes: merged, cursor: page.cursor, hasMore: Boolean(page.cursor), status: 'idle' });
    } catch (_error) {
      set({ error: 'Could not load more notes.', status: 'idle' });
    }
  },

  /**
   * Uploads a file and creates its note metadata. On failure, saves a pending
   * draft so the user can retry.
   */
  addNote: async ({ ownerUid, file, title }) => {
    const noteId = makeNoteId();
    set({ status: 'uploading', error: null, uploadProgress: 0 });
    try {
      const { storagePath } = await uploadNoteFile({
        file,
        ownerUid,
        noteId,
        onProgress: (percent) => set({ uploadProgress: percent }),
      });

      const note = await createNote({
        noteId,
        ownerUid,
        title: title ?? file.name ?? 'Untitled',
        storagePath,
        fileType: file.mimeType,
        size: file.size,
      });

      const updated = [{ id: noteId, ...note }, ...get().notes];
      await cacheNotes(ownerUid, updated);
      set({ notes: updated, status: 'idle', uploadProgress: 100 });
      return note;
    } catch (error) {
      await addPendingUpload({
        noteId,
        ownerUid,
        title: title ?? file.name ?? 'Untitled',
        localUri: file.uri,
        mimeType: file.mimeType,
        size: file.size,
      });
      set({ error: error.message, status: 'error', uploadProgress: 0 });
      throw error;
    }
  },

  /** Deletes a note's file and metadata, then updates local state. */
  removeNote: async (noteId, ownerUid) => {
    const note = await getNote(noteId, ownerUid);
    if (note && note.filePath) {
      await deleteNoteFile(note.filePath);
    }
    await deleteNote(noteId);
    const remaining = get().notes.filter((n) => (n.noteId ?? n.id) !== noteId);
    await cacheNotes(ownerUid, remaining);
    set({ notes: remaining });
  },

  /** Clears cached notes for a user on sign-out. */
  clear: async (ownerUid) => {
    if (ownerUid) {
      await clearUserCache(ownerUid);
    }
    set({ notes: [], cursor: null, hasMore: false, error: null, status: 'idle' });
  },

  clearError: () => set({ error: null }),
}));

export default useNotesStore;
