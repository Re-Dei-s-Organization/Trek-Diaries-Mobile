import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  slug: 'TrekDiaries',
  name: 'TrekDiaries',
  version: '1.0.0',
  scheme: ['trekking app'],
  orientation: 'portrait',
  icon: './assets/iconic.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splashy_logo.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adapt-icon.png',
      backgroundColor: '#FFFFFF',
    },
  },
  web: {
    favicon: './assets/favicon.png',
    output: 'server',
  },
  plugins: [
    [
      'expo-router',
      {
        origin: process.env.VERCEL_PROJECT_PRODUCTION_URL || 'http://localhost:8081',
      },
    ],
    [
      'expo-image-picker',
      {
        photosPermission: 'The app accesses your photos to let you share them with your friends.',
      },
    ],
    'expo-font',
    'expo-secure-store',
  ],
});
