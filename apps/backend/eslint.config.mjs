import base from '@packages/eslint-config';

/** @type {import("eslint").Linter.Config} */
export default [
  {
    // Files to ignore overvrites doesn't work
    ignores: ['**/node_modules/**', '**/dist/**', '**/__tests__/**', '**/**.js'],
  },
  ...base,
];
