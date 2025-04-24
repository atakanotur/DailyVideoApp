const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const exclusionList = require('metro-config/src/defaults/exclusionList');
const path = require('path');

// Varsayılan Expo Metro yapılandırmasını al
const config = getDefaultConfig(__dirname);

// NativeWind için gerekli ayarları ekle
config.transformer = {
  ...config.transformer,
  unstable_allowRequireContext: true,
};

config.resolver = {
  ...config.resolver,
  extraNodeModules: {
    ...config.resolver.extraNodeModules,
    'react-native': path.resolve(__dirname, 'node_modules/react-native'),
    react: path.resolve(__dirname, 'node_modules/react'),
    '@babel/runtime': path.resolve(__dirname, 'node_modules/@babel/runtime'),
  },
  blockList: exclusionList([
    /.*\/ffmpeg-kit\/react-native\/node_modules\/.*/,
  ]),
};

// ffmpeg-kit klasörünü izlenecek klasörler listesine ekle
config.watchFolders = [
  path.resolve(__dirname, '../ffmpeg-kit/react-native'),
];

// NativeWind ile yapılandırmayı sarmala
module.exports = withNativeWind(config, { input: './global.css' });