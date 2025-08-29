import js from "@eslint/js";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import security from "eslint-plugin-security";
import prettier from "eslint-plugin-prettier";
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from "globals";

export default [

  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/__tests__/**', '**/*.js'],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    plugins: {
      import: importPlugin,
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      security,
      prettier
    },
    settings: {
      "import/resolver": { typescript: { alwaysTryTypes: true } },
      react: { version: "detect" }
    },
    rules: {
      "prettier/prettier": "error",
      "import/order": [
        "warn",
        {
          groups: [
            "external",
            "builtin",
            "internal",
            "parent",
            "sibling",
            "index",
            "type"
          ],
          alphabetize: { order: "asc", caseInsensitive: true }
        }
      ],
      "import/no-unresolved": "off",

      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
      ],

      "react/react-in-jsx-scope": "off"
    }
  },
  {
    files: ["apps/backend/**/*"],
    languageOptions: { globals: globals.node },
  },
  {
    files: ["apps/web/**/*"],
    languageOptions: { globals: globals.browser }
  },
  eslintConfigPrettier
];
