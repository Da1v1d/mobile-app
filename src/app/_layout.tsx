import 'react-native-reanimated';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import ThemeProvider from '@/providers/theme-provider';
import { GluestackUIProvider } from '@/shared/components/ui/gluestack-ui-provider';

import '../../global.css';

export default function RootLayout() {
  return (
    <GluestackUIProvider mode='system'>
      <ThemeProvider>
        <Stack>
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
          {/* <Stack.Screen name='+not-found' /> */}
        </Stack>
        <StatusBar style='auto' />
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
