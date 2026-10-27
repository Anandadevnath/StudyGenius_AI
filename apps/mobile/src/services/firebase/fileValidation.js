/**
 * File-validation boundaries for note uploads (proposal §5.3, §14).
 *
 * Shared by the upload service and the add-note UI so client and service agree
 * on what is accepted. This is a client convenience/UX boundary only — real
 * enforcement lives in Storage rules and the backend.
 */

export const ALLOWED_MIME_TYPES = {
  'application/pdf': 'pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'text/plain': 'txt',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

/**
 * Validates a picked file against the allowed types and size limit.
 * @param {{name?: string, mimeType?: string, size?: number}} file
 * @returns {{valid: boolean, error: string|null}}
 */
export function validateNoteFile(file) {
  if (!file) {
    return { valid: false, error: 'No file selected.' };
  }

  if (!ALLOWED_MIME_TYPES[file.mimeType]) {
    return {
      valid: false,
      error: 'Unsupported file type. Use PDF, DOCX, TXT, JPG, or PNG.',
    };
  }

  if (typeof file.size !== 'number' || file.size <= 0) {
    return { valid: false, error: 'File appears to be empty.' };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `File is too large. Maximum size is ${MAX_FILE_SIZE_BYTES / (1024 * 1024)} MB.`,
    };
  }

  return { valid: true, error: null };
}

/**
 * Returns the Storage file extension for a mime type, or null if unsupported.
 * @param {string} mimeType
 * @returns {string|null}
 */
export function extensionForMimeType(mimeType) {
  return ALLOWED_MIME_TYPES[mimeType] ?? null;
}

/**
 * Builds the Storage path for a note. Scoped under the owner's UID so Storage
 * rules can be written as `request.auth.uid == uid`.
 * @param {string} ownerUid
 * @param {string} noteId
 * @param {string} mimeType
 * @returns {string}
 */
export function buildNoteStoragePath(ownerUid, noteId, mimeType) {
  const ext = extensionForMimeType(mimeType) ?? 'bin';
  return `notes/${ownerUid}/${noteId}.${ext}`;
}

export default {
  ALLOWED_MIME_TYPES,
  MAX_FILE_SIZE_BYTES,
  validateNoteFile,
  extensionForMimeType,
  buildNoteStoragePath,
};
