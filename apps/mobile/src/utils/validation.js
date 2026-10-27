/**
 * Validation helpers for the auth forms (proposal §5.1, §6).
 *
 * Pure functions so they can be unit-tested and reused by both the login and
 * register flows. These are UX-level checks; Firebase and Firestore rules are
 * the real enforcement.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** @returns {string|null} an error message, or null when valid. */
export function validateEmail(email) {
  const value = (email ?? '').trim();
  if (!value) {
    return 'Email is required.';
  }
  if (!EMAIL_RE.test(value)) {
    return 'Enter a valid email address.';
  }
  return null;
}

/** @returns {string|null} an error message, or null when valid. */
export function validatePassword(password, { requireStrong = false } = {}) {
  const value = password ?? '';
  if (!value) {
    return 'Password is required.';
  }
  if (!requireStrong) {
    return value.length < 6 ? 'Password must be at least 6 characters.' : null;
  }
  if (value.length < 8) {
    return 'Use at least 8 characters.';
  }
  if (!/[a-z]/.test(value) || !/[A-Z]/.test(value)) {
    return 'Include an uppercase and a lowercase letter.';
  }
  return null;
}

/** @returns {string|null} an error message, or null when valid. */
export function validateName(name) {
  const value = (name ?? '').trim();
  if (!value) {
    return 'Name is required.';
  }
  if (value.length < 2) {
    return 'Name is too short.';
  }
  return null;
}

/** @returns {string|null} an error message, or null when they match. */
export function validateConfirmPassword(password, confirm) {
  if (!confirm) {
    return 'Confirm your password.';
  }
  if (password !== confirm) {
    return 'Passwords do not match.';
  }
  return null;
}

/**
 * Scores password strength 0–4 for the strength meter.
 * @param {string} password
 * @returns {{score: number, label: string, tone: string}}
 */
export function passwordStrength(password) {
  const value = password ?? '';
  if (!value) {
    return { score: 0, label: '', tone: 'neutral' };
  }
  let score = 0;
  if (value.length >= 8) score += 1;
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score += 1;
  if (/\d/.test(value)) score += 1;
  if (/[^A-Za-z0-9]/.test(value)) score += 1;

  const table = [
    { label: 'Very weak', tone: 'danger' },
    { label: 'Weak', tone: 'danger' },
    { label: 'Fair', tone: 'warning' },
    { label: 'Good', tone: 'success' },
    { label: 'Strong', tone: 'success' },
  ];
  return { score, ...table[score] };
}

export default {
  validateEmail,
  validatePassword,
  validateName,
  validateConfirmPassword,
  passwordStrength,
};
