const tsplugin = require('@typescript-eslint/eslint-plugin');
const tseslint = require('typescript-eslint');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const eslintPluginPrettier = require('eslint-plugin-prettier');
const tsSortKeys = require('eslint-plugin-typescript-sort-keys');
const sortKeysPlus = require('eslint-plugin-sort-keys-plus');

module.exports = tseslint.config({
  extends: [...tseslint.configs.recommended, eslintPluginPrettierRecommended],
  files: ['src/**/*.ts', 'src/**/*.ts'],
  languageOptions: {
    sourceType: 'module',
    parser: tseslint.parser,
    parserOptions: {
      project: 'tsconfig.json',
    },
    globals: {
      node: true,
      jest: true,
    },
  },
  plugins: {
    '@typescript-eslint/eslint-plugin': tsplugin,
    'sort-keys-plus': sortKeysPlus,
    'typescript-sort-keys': tsSortKeys,
    prettier: eslintPluginPrettier,
  },
  ignores: ['**/eslint.config.js', 'dist/**/*'],
  rules: {
    'typescript-sort-keys/interface': [
      'warn',
      'asc',
      { caseSensitive: true, natural: false, requiredFirst: true },
    ],
    'sort-keys-plus/sort-keys': [
      'warn',
      'asc',
      { caseSensitive: true, natural: false },
    ],
    'typescript-sort-keys/string-enum': [
      'warn',
      'asc',
      { caseSensitive: true, natural: true },
    ],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
});
