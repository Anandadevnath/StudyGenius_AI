// eslint.config.js — flat config for the StudyGenius AI Expo app.
// Uses eslint-config-expo (SDK-aligned). Extend as the codebase grows.
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const globals = require('globals');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*', 'node_modules/*', '.expo/*'],
  },
  {
    files: ['**/__tests__/**/*.js', '**/*.test.js', 'jest.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },
]);
