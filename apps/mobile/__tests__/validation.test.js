/**
 * Auth form validation helper tests (pure functions).
 */
import {
  validateEmail,
  validatePassword,
  validateName,
  validateConfirmPassword,
  passwordStrength,
} from '../src/utils/validation';

describe('validateEmail', () => {
  it('accepts a valid email', () => {
    expect(validateEmail('a@b.com')).toBeNull();
  });
  it('rejects empty and malformed emails', () => {
    expect(validateEmail('')).toMatch(/required/);
    expect(validateEmail('not-an-email')).toMatch(/valid/);
    expect(validateEmail('a@b')).toMatch(/valid/);
  });
});

describe('validatePassword', () => {
  it('requires 6+ characters for sign-in', () => {
    expect(validatePassword('12345')).toMatch(/6 characters/);
    expect(validatePassword('123456')).toBeNull();
  });
  it('requires 8+, upper and lower case when strong', () => {
    expect(validatePassword('short', { requireStrong: true })).toMatch(/8 characters/);
    expect(validatePassword('alllowercase', { requireStrong: true })).toMatch(/upper/);
    expect(validatePassword('GoodPass1', { requireStrong: true })).toBeNull();
  });
});

describe('validateName', () => {
  it('requires a name of at least 2 characters', () => {
    expect(validateName('')).toMatch(/required/);
    expect(validateName('A')).toMatch(/short/);
    expect(validateName('Ananda')).toBeNull();
  });
});

describe('validateConfirmPassword', () => {
  it('checks emptiness and match', () => {
    expect(validateConfirmPassword('abc', '')).toMatch(/Confirm/);
    expect(validateConfirmPassword('abc', 'abd')).toMatch(/match/);
    expect(validateConfirmPassword('abc', 'abc')).toBeNull();
  });
});

describe('passwordStrength', () => {
  it('scores weak to strong', () => {
    expect(passwordStrength('').score).toBe(0);
    expect(passwordStrength('abc').score).toBeLessThan(2);
    expect(passwordStrength('Abcdefg1!').score).toBe(4);
    expect(passwordStrength('Abcdefg1!').label).toBe('Strong');
  });
});
