module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@assets': './src/assets',
          '@screens': './src/screens',
          '@components': './src/components',
          '@routes': './src/routes',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
