const defaultRules = {
  // These rules are a bit too aggressive
  'unicorn/no-null': 'off',
  'unicorn/filename-case': 'off',
  'unicorn/prefer-module': 'off',
  'unicorn/no-array-reduce': 'off',
  'unicorn/prefer-top-level-await': 'off',
  'unicorn/switch-case-braces': 'off',
  'unicorn/no-typeof-undefined': 'off',
  'unicorn/no-negated-condition': 'off',
  'unicorn/no-useless-undefined': 'off',

  // Allow some common abbreviations
  'unicorn/prevent-abbreviations': [
    'error',
    {
      allowList: {
        props: true,
        Props: true,
        params: true,
        Params: true,
        args: true,
        func: true,
        env: true,
        prod: true,
        dev: true,
      },
    },
  ],

  // Allow @ts-* with descriptions
  '@typescript-eslint/ban-ts-comment': [
    'error',
    {
      'ts-expect-error': 'allow-with-description',
      'ts-ignore': 'allow-with-description',
      'ts-nocheck': 'allow-with-description',
      'ts-check': 'allow-with-description',
    },
  ],

  // Allow using any for rest arguments (i.e. `...any[]`)
  '@typescript-eslint/no-explicit-any': [
    'error',
    { ignoreRestArgs: true, fixToUnknown: true },
  ],

  // Show warning when using non-null assertions
  // Long-term plan is to make this an error
  '@typescript-eslint/no-non-null-assertion': 'warn',

  // Enforce consistent import ordering
  'simple-import-sort/imports': [
    'error',
    {
      groups: [
        // Side effect imports.
        ['^\\u0000'],
        // Internal packages, then alphabetical third party packages
        ['^@?\\w'],
        // Parent imports. Put `..` last.
        ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
        // Other relative imports. Put same-folder imports and `.` last.
        ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
        // Style imports.
        ['^.+\\.s?css$'],
      ],
    },
  ],
}

const defaultExtends = [
  'eslint:recommended',
  'plugin:@typescript-eslint/recommended',
  'plugin:unicorn/recommended',
  'prettier',
]

const defaultPlugins = ['simple-import-sort']

module.exports = {
  root: true,
  ignorePatterns: ['**/node_modules/**', '**/dist/**', '.eslintrc.cjs'],

  overrides: [
    {
      files: ['*.mjs'],
      parserOptions: {
        sourceType: 'module',
      },
      rules: {
        ...defaultRules,
      },
    },
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {
        ...defaultRules,
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      extends: [...defaultExtends],
      plugins: [...defaultPlugins],
      rules: {
        ...defaultRules,
      },
    },
    {
      files: ['*.js', '*.jsx'],
      extends: [...defaultExtends],
      plugins: [...defaultPlugins],
      rules: {
        ...defaultRules,
      },
    },
    {
      files: ['*.spec.ts', '*.spec.tsx', '*.spec.js', '*.spec.jsx'],
      env: {
        jest: true,
      },
      rules: {
        ...defaultRules,
      },
    },
  ],

  extends: ['plugin:storybook/recommended']
}
