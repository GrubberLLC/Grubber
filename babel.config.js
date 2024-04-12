module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: ["nativewind/babel"],
  plugins: [
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
    }],
  ],
};
