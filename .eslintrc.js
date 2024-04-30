module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
    "react-native/no-inline-styles": "off",
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
  }
};