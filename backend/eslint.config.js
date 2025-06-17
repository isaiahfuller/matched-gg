const tsplugin = require('@typescript-eslint/eslint-plugin');
const tseslint = require('typescript-eslint');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const eslintPluginPrettier = require('eslint-plugin-prettier');
const perfectionistRecommended = require('eslint-plugin-perfectionist/configs/recommended-natural');
const perfectionist = require('eslint-plugin-perfectionist');
const tsdoc = require('eslint-plugin-tsdoc')

module.exports = tseslint.config({
  extends: [
    ...tseslint.configs.recommended,
    eslintPluginPrettierRecommended,
    perfectionistRecommended,
  ],
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
    perfectionist: perfectionist,
    prettier: eslintPluginPrettier,
    'eslint-plugin-tsdoc': tsdoc
  },
  ignores: ['**/eslint.config.js', 'dist/**/*'],
  rules: {
    'perfectionist/sort-enums': [
      'error',
      {
        type: 'natural',
        order: 'asc',
        'ignore-case': true,
        'partition-by-comment': true,
      },
    ],
    "eslint-plugin-tsdoc/syntax": 'warn',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-namespace': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
});
