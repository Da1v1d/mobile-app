import { useState } from 'react';

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as RNThemeProvider,
} from '@react-navigation/native';

import { useFonts } from 'expo-font';

import { useColorScheme } from '@/hooks/useColorScheme';

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const colorScheme = useColorScheme();

  const [theme, setTheme] = useState<'light' | 'dark'>(colorScheme ?? 'light');

  const isDark = theme === 'dark';

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return <RNThemeProvider value={isDark ? DarkTheme : DefaultTheme}>{children}</RNThemeProvider>;
};

export default ThemeProvider;
