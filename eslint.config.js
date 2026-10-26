/**
 * eslint.config.js — Root ESLint flat config (ESLint 9).
 *
 * Each workspace lints its own code with its own config:
 *   - apps/mobile  -> eslint.config.js (eslint-config-expo)
 *   - apps/backend -> eslint.config.js (eslint + @eslint/js)
 *
 * This root config exists so repo-level JS (scripts) is lintable and so a
 * root `eslint .` does not double-lint workspace source. It ignores the
 * workspaces and build output; run `npm run lint` to lint each workspace.
 */
'use strict';

const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  {
    ignores: [
      '**/node_modules/**',
      'apps/**', // each workspace lints itself
      '**/coverage/**',
      '**/dist/**',
      '**/.expo/**',
    ],
  },
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
];
