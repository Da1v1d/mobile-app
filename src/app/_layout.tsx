import 'react-native-reanimated';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { QueryProvider } from '@/providers/query-provider';
import ThemeProvider from '@/providers/theme-provider';
import { GluestackUIProvider } from '@/shared/components/ui/gluestack-ui-provider';

import '../../global.css';

export default function RootLayout() {
  return (
    <QueryProvider>
      <GluestackUIProvider mode='system'>
        <ThemeProvider>
          <Stack>
            <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
            {/* <Stack.Screen name='+not-found' /> */}
          </Stack>
          <StatusBar style='auto' />
        </ThemeProvider>
      </GluestackUIProvider>
    </QueryProvider>
  );
}
