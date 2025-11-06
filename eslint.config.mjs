// eslint.config.js
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const stylistic = require('@stylistic/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const { FlatCompat } = require('@eslint/eslintrc');
const { fileURLToPath } = require('url');
const globals = require('globals');
const path = require('path');
const js = require('@eslint/js');

// __filename and __dirname for CommonJS
const __filenameCJS = __filename || process.argv[1];
const __dirnameCJS = path.dirname(__filenameCJS);

// Create compat instance
const compat = new FlatCompat({
  baseDirectory: __dirnameCJS,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

module.exports = [
  ...compat.extends('eslint:recommended', 'plugin:@typescript-eslint/recommended'),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      '@stylistic': stylistic
    },

    languageOptions: {
      globals: {
        ...globals.browser
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module'
    },

    rules: {
      'no-case-declarations': 'off',

      indent: [
        'error',
        2,
        {
          SwitchCase: 1
        }
      ],

      '@stylistic/linebreak-style': ['error', 'windows'],
      quotes: ['error', 'single'],
      semi: ['error', 'never']
    }
  },

  {
    ignores: ['tests/__data__/**']
  }
];