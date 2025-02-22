import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Evita la chiusura della splash screen prima del caricamento
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName="login"> {/* 👈 Login come schermata iniziale */}
        {/* Schermata Login */}
        <Stack.Screen name="login" options={{ headerShown: false }} />

        {/* Tabs principali DOPO il login */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Schermata per rotte non trovate */}
        <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
