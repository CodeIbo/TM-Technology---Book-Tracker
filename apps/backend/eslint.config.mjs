import base from '@packages/eslint-config';
import globals from 'globals';

export default [
  { ignores: ['**/node_modules/**', '**/dist/**', '**/__tests__/**', '**/*.js'] },
  ...base,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: { globals: globals.node },
  },
];
