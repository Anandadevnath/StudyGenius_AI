/**
 * services/firebase/storage.js — Firebase Storage upload/download service.
 *
 * Proposal ref: §5.3 (notes & file management), §11 (files), §14 (security).
 *
 * One boundary for file bytes. Validates before uploading, reports progress,
 * and resolves a download URL + storage path for the caller to persist as note
 * metadata. Client-side validation here is a UX boundary only; Storage rules
 * and the backend are the real enforcement.
 */

import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';

import { getFirebaseStorage } from './client';
import { validateNoteFile, buildNoteStoragePath } from './fileValidation';

/**
 * Uploads a note file with progress reporting.
 * @param {object} params
 * @param {{uri: string, name?: string, mimeType?: string, size?: number}} params.file
 * @param {string} params.ownerUid
 * @param {string} params.noteId
 * @param {(percent: number) => void} [params.onProgress]
 * @returns {Promise<{storagePath: string, downloadUrl: string}>}
 */
export async function uploadNoteFile({ file, ownerUid, noteId, onProgress }) {
  const { valid, error } = validateNoteFile(file);
  if (!valid) {
    throw new Error(error);
  }

  const storagePath = buildNoteStoragePath(ownerUid, noteId, file.mimeType);
  const storageRef = ref(getFirebaseStorage(), storagePath);

  const response = await fetch(file.uri);
  const blob = await response.blob();

  const task = uploadBytesResumable(storageRef, blob, {
    contentType: file.mimeType,
  });

  return new Promise((resolve, reject) => {
    task.on(
      'state_changed',
      (snapshot) => {
        if (onProgress && snapshot.totalBytes > 0) {
          onProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
        }
      },
      (err) => reject(new Error('Upload failed. Check your connection and try again.')),
      async () => {
        const downloadUrl = await getDownloadURL(task.snapshot.ref);
        resolve({ storagePath, downloadUrl });
      },
    );
  });
}

/**
 * Deletes a note file from Storage. Missing objects are treated as success so
 * deletion is idempotent.
 * @param {string} storagePath
 */
export async function deleteNoteFile(storagePath) {
  try {
    await deleteObject(ref(getFirebaseStorage(), storagePath));
  } catch (error) {
    if (error && error.code === 'storage/object-not-found') {
      return;
    }
    throw new Error('Could not delete the file. Please try again.');
  }
}

export default { uploadNoteFile, deleteNoteFile };
