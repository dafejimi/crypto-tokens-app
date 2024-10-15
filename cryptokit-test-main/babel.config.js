module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module:react-native-dotenv', {
      moduleName: '@env', // Import module as @env
      path: '.env',       // Path to the .env file
      safe: false,
      allowUndefined: true,
    }],
    'react-native-reanimated/plugin',
  ],
};

