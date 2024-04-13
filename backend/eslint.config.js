const tsplugin = require('@typescript-eslint/eslint-plugin');
const tseslint = require('typescript-eslint');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const eslintPluginPrettier = require('eslint-plugin-prettier');

module.exports = tseslint.config({
  extends: [...tseslint.configs.recommended, eslintPluginPrettierRecommended],
  files: ['src/**/*.ts', 'src/**/*.ts'],
  languageOptions: {
    sourceType: 'module',
    parser: tseslint.parser,
    globals: {
      node: true,
      jest: true,
    },
  },
  plugins: {
    '@typescript-eslint/eslint-plugin': tsplugin,
    prettier: eslintPluginPrettier,
  },
  ignores: ['**/eslint.config.js', 'dist/**/*'],
  rules: {
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
