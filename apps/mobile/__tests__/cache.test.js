/**
 * SQLite cache service tests — uses an injected fake database handle so no
 * native expo-sqlite is required. Verifies SQL/params and data flow.
 */
import {
  _setCacheDb,
  _resetCacheDb,
  cacheNotes,
  getCachedNotes,
  addPendingUpload,
  removePendingUpload,
  clearUserCache,
} from '../src/services/database/cache';

function makeFakeDb() {
  return {
    execAsync: jest.fn().mockResolvedValue(),
    runAsync: jest.fn().mockResolvedValue(),
    getAllAsync: jest.fn().mockResolvedValue([]),
    withTransactionAsync: jest.fn(async (fn) => fn()),
  };
}

describe('cache service', () => {
  let db;

  beforeEach(() => {
    db = makeFakeDb();
    _setCacheDb(db);
  });

  afterEach(() => _resetCacheDb());

  it('cacheNotes clears then inserts each note for the owner', async () => {
    await cacheNotes('uid-1', [{ noteId: 'n1', title: 'T', fileType: 'application/pdf' }]);

    expect(db.runAsync).toHaveBeenCalledWith('DELETE FROM cached_notes WHERE ownerUid = ?', [
      'uid-1',
    ]);
    expect(db.runAsync).toHaveBeenCalledWith(
      expect.stringContaining('INSERT OR REPLACE INTO cached_notes'),
      expect.arrayContaining(['n1', 'uid-1', 'T']),
    );
  });

  it('getCachedNotes filters by owner', async () => {
    await getCachedNotes('uid-1');
    expect(db.getAllAsync).toHaveBeenCalledWith(expect.stringContaining('WHERE ownerUid = ?'), [
      'uid-1',
    ]);
  });

  it('addPendingUpload stores a draft row', async () => {
    await addPendingUpload({ noteId: 'p1', ownerUid: 'uid-1', localUri: 'file://a', size: 5 });
    expect(db.runAsync).toHaveBeenCalledWith(
      expect.stringContaining('INSERT OR REPLACE INTO pending_uploads'),
      expect.arrayContaining(['p1', 'uid-1', 'file://a']),
    );
  });

  it('removePendingUpload deletes by noteId', async () => {
    await removePendingUpload('p1');
    expect(db.runAsync).toHaveBeenCalledWith('DELETE FROM pending_uploads WHERE noteId = ?', [
      'p1',
    ]);
  });

  it('clearUserCache clears both tables for the owner', async () => {
    await clearUserCache('uid-1');
    expect(db.runAsync).toHaveBeenCalledWith('DELETE FROM cached_notes WHERE ownerUid = ?', [
      'uid-1',
    ]);
    expect(db.runAsync).toHaveBeenCalledWith('DELETE FROM pending_uploads WHERE ownerUid = ?', [
      'uid-1',
    ]);
  });
});
