/**
 * File-validation boundary tests (pure functions, no mocks).
 */
import {
  validateNoteFile,
  extensionForMimeType,
  buildNoteStoragePath,
  MAX_FILE_SIZE_BYTES,
} from '../src/services/firebase/fileValidation';

describe('validateNoteFile', () => {
  it('accepts an allowed file within the size limit', () => {
    expect(validateNoteFile({ mimeType: 'application/pdf', size: 1000 })).toEqual({
      valid: true,
      error: null,
    });
  });

  it('rejects a missing file', () => {
    expect(validateNoteFile(null).valid).toBe(false);
  });

  it('rejects an unsupported type', () => {
    const result = validateNoteFile({ mimeType: 'application/zip', size: 1000 });
    expect(result.valid).toBe(false);
    expect(result.error).toMatch(/Unsupported file type/);
  });

  it('rejects an empty file', () => {
    expect(validateNoteFile({ mimeType: 'text/plain', size: 0 }).valid).toBe(false);
  });

  it('rejects a file over the size limit', () => {
    const result = validateNoteFile({ mimeType: 'text/plain', size: MAX_FILE_SIZE_BYTES + 1 });
    expect(result.valid).toBe(false);
    expect(result.error).toMatch(/too large/);
  });
});

describe('extensionForMimeType', () => {
  it('maps known mime types to extensions', () => {
    expect(extensionForMimeType('image/jpeg')).toBe('jpg');
    expect(extensionForMimeType('application/pdf')).toBe('pdf');
  });

  it('returns null for unknown types', () => {
    expect(extensionForMimeType('application/zip')).toBeNull();
  });
});

describe('buildNoteStoragePath', () => {
  it('scopes the path under the owner uid', () => {
    expect(buildNoteStoragePath('uid-1', 'note-9', 'application/pdf')).toBe(
      'notes/uid-1/note-9.pdf',
    );
  });

  it('falls back to .bin for unknown types', () => {
    expect(buildNoteStoragePath('uid-1', 'note-9', 'application/zip')).toBe(
      'notes/uid-1/note-9.bin',
    );
  });
});
