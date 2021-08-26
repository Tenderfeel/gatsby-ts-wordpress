const path = require(`path`)

module.exports = {
  root: true,
  // https://eslint.org/docs/user-guide/configuring/language-options
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  plugins: ['react', 'graphql'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        tsconfigRootDir: __dirname,
        ecmaFeatures: {
          jsx: true,
        },
        project: ['./tsconfig.json'],
      },
      extends: ['plugin:@typescript-eslint/recommended'],
      plugins: ['@typescript-eslint'],
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'graphql/template-strings': [
      'error',
      {
        env: 'relay',
        tagName: 'graphql',
        schemaJsonFilepath: path.resolve(
          __dirname,
          'src/__generated__/gatsby-introspection.json'
        ),
      },
    ],
  },
}
