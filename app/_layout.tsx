import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Tabs } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { ImageProvider } from '@/context/ImageContext';


// Prevent the splash screen from auto-hiding before asset loading is complete.
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

  if (!loaded) {
    return null;
  }

  return (
    <ImageProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Tabs screenOptions={{ contentStyle: { backgroundColor: "#f0f0f0" } }}>
          <Tabs.Screen name="index" options={{ headerShown: false, tabBarStyle: { display: "none" } }} />
          <Tabs.Screen name="fish" options={{
            headerShown: false,
            title: "nivasilan ko a among",
            headerTitleAlign: "center",
            headerBackButtonDisplayMode: "minimal",
            tabBarStyle: { display: "none" },
          }}
          />
        </Tabs>
        <StatusBar style="auto" />
      </ThemeProvider>
    </ImageProvider>
  );
}
