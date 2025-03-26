module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  rules: {
    // 自定义规则
    'react/react-in-jsx-scope': 'off', // React 17之后不需要导入React
    '@typescript-eslint/explicit-module-boundary-types': 'off', // 不强制要求导出函数和类的公共类方法的显式返回和参数类型
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ], // 未使用的变量，以_开头的参数和变量除外
    '@typescript-eslint/no-explicit-any': 'warn', // 禁止使用any类型
    'import/order': [
      'off', // 关闭导入顺序检查
    ],
  },
  ignorePatterns: ['node_modules/', 'build/', 'dist/', '*.config.js', '.eslintrc.js'],
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
};
