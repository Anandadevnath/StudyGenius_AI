/**
 * notesStore tests — upload orchestration, cache-first load, and draft
 * fallback. Storage, notes metadata, and cache services are mocked.
 */
import { uploadNoteFile, deleteNoteFile } from '../src/services/firebase/storage';
import { createNote, listNotes, getNote, deleteNote } from '../src/services/firebase/notes';
import { cacheNotes, getCachedNotes, addPendingUpload } from '../src/services/database/cache';
import { useNotesStore } from '../src/stores/notesStore';

jest.mock('../src/services/firebase/storage', () => ({
  uploadNoteFile: jest.fn(),
  deleteNoteFile: jest.fn(),
}));

jest.mock('../src/services/firebase/notes', () => ({
  createNote: jest.fn(),
  listNotes: jest.fn(),
  getNote: jest.fn(),
  deleteNote: jest.fn(),
}));

jest.mock('../src/services/database/cache', () => ({
  cacheNotes: jest.fn(),
  getCachedNotes: jest.fn(),
  addPendingUpload: jest.fn(),
  clearUserCache: jest.fn(),
}));

const file = { uri: 'file://a.pdf', name: 'a.pdf', mimeType: 'application/pdf', size: 1000 };

describe('notesStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useNotesStore.setState({
      notes: [],
      status: 'idle',
      error: null,
      uploadProgress: 0,
      cursor: null,
      hasMore: false,
    });
  });

  it('load shows cached notes then refreshes from Firestore', async () => {
    getCachedNotes.mockResolvedValue([{ noteId: 'cached-1', title: 'Cached' }]);
    listNotes.mockResolvedValue({ notes: [{ id: 'n1', title: 'Fresh' }], cursor: null });

    await useNotesStore.getState().load('uid-1');

    expect(getCachedNotes).toHaveBeenCalledWith('uid-1');
    expect(useNotesStore.getState().notes).toEqual([{ id: 'n1', title: 'Fresh' }]);
    expect(cacheNotes).toHaveBeenCalled();
  });

  it('addNote uploads, creates metadata, and prepends the note', async () => {
    uploadNoteFile.mockImplementation(async ({ onProgress }) => {
      onProgress?.(50);
      return { storagePath: 'notes/uid-1/x.pdf', downloadUrl: 'https://x' };
    });
    createNote.mockResolvedValue({ noteId: 'x', title: 'a.pdf', ownerUid: 'uid-1' });

    await useNotesStore.getState().addNote({ ownerUid: 'uid-1', file, title: 'a.pdf' });

    expect(uploadNoteFile).toHaveBeenCalled();
    expect(createNote).toHaveBeenCalled();
    expect(useNotesStore.getState().notes[0].noteId).toBe('x');
    expect(useNotesStore.getState().uploadProgress).toBe(100);
  });

  it('addNote saves a pending draft when upload fails', async () => {
    uploadNoteFile.mockRejectedValue(new Error('Upload failed.'));

    await expect(
      useNotesStore.getState().addNote({ ownerUid: 'uid-1', file, title: 'a.pdf' }),
    ).rejects.toThrow('Upload failed.');

    expect(addPendingUpload).toHaveBeenCalledWith(
      expect.objectContaining({ ownerUid: 'uid-1', localUri: file.uri, mimeType: file.mimeType }),
    );
    expect(useNotesStore.getState().status).toBe('error');
  });

  it('removeNote deletes the file and metadata, then updates state', async () => {
    useNotesStore.setState({ notes: [{ noteId: 'x', filePath: 'notes/uid-1/x.pdf' }] });
    getNote.mockResolvedValue({ noteId: 'x', filePath: 'notes/uid-1/x.pdf', ownerUid: 'uid-1' });
    deleteNoteFile.mockResolvedValue();
    deleteNote.mockResolvedValue();

    await useNotesStore.getState().removeNote('x', 'uid-1');

    expect(deleteNoteFile).toHaveBeenCalledWith('notes/uid-1/x.pdf');
    expect(deleteNote).toHaveBeenCalledWith('x');
    expect(useNotesStore.getState().notes).toEqual([]);
  });
});
