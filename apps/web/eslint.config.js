import base from '@packages/eslint-config';

/** @type {import("eslint").Linter.Config} */

export default [
  {
    files: ['**/*.{ts,tsx}'],
    // Files to ignore extend doesn't work
    ignores: ['**/node_modules/**', '**/dist/**', '**/__tests__/**', '**/**.js'],
  },
  ...base,
];
