import { Platform } from 'react-native';

import Constants from 'expo-constants';

import { ValueOf } from '@/shared/types/types';

// Check if running in Expo Go (StoreClient)
export const IS_EXPO_GO = Constants.executionEnvironment === 'storeClient';

export const IS_BUILD_APP = Constants.executionEnvironment === 'standalone';

export const IS_BARE = Constants.executionEnvironment === 'bare';

// Check if running in development
export const IS_DEV = __DEV__;

// Check if running in production
export const IS_PROD = !__DEV__;

// Check if running in a built app (not Expo Go)
export const IS_BUILT_APP = !IS_EXPO_GO;

// Check if running in a standalone app (built APK/IPA)

// Check if running in a managed workflow
export const IS_MANAGED =
  Constants.executionEnvironment === 'storeClient' ||
  Constants.executionEnvironment === 'standalone';

// Check if running in a bare workflow

// Platform-specific constants
export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';
export const IS_WEB = Platform.OS === 'web';

// Environment type enum
export const Environment = {
  EXPO_GO: 'expo-go',
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  STANDALONE: 'standalone',
  BARE: 'bare',
} as const;

// Get current environment
export const getCurrentEnvironment = (): ValueOf<typeof Environment> => {
  if (IS_EXPO_GO) return Environment.EXPO_GO;
  if (IS_BUILT_APP) return Environment.STANDALONE;
  if (IS_BARE) return Environment.BARE;
  if (IS_DEV) return Environment.DEVELOPMENT;
  return Environment.PRODUCTION;
};

// App version and build info
export const APP_INFO = {
  VERSION: Constants.expoConfig?.version || '1.0.0',
  BUILD_NUMBER:
    Constants.expoConfig?.ios?.buildNumber || Constants.expoConfig?.android?.versionCode || '1',
  BUNDLE_IDENTIFIER:
    Constants.expoConfig?.ios?.bundleIdentifier ||
    Constants.expoConfig?.android?.package ||
    'com.my.mobile.app',
  EXECUTION_ENVIRONMENT: Constants.executionEnvironment,
  PLATFORM: Platform.OS,
} as const;
