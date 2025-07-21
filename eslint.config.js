import pluginQuery from '@tanstack/eslint-plugin-query';

const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = defineConfig([
  expoConfig,
  ...pluginQuery.configs['flat/recommended'],
  eslintPluginPrettierRecommended,
  {
    ignores: ['dist/*'],
    rules: {
      'prettier/prettier': 'error',
      'import/order': 'off',
      'simple-import-sort/imports': 'off',
      'simple-import-sort/exports': 'off',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
]);
