module.exports = {
  root: true,
  extends: ['prettier', '@react-native-community'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
};
