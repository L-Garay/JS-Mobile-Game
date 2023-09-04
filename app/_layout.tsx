import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from '@react-navigation/native';
import { OrientationProvider } from '../contexts/OrientationContext';
import { CharacterProvider } from '../contexts/CharacterContext';
import { CarouselProvider } from '../contexts/CarouselContext';
import { StorageProvider } from '../contexts/StorageContext';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  //  add conditions to this effect to prevent the splash screen from hiding before the assets are loaded
  // images, fonts, data, configs, etc.
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <OrientationProvider>
        <CharacterProvider>
          <CarouselProvider>
            <StorageProvider>
              <Stack>
                <Stack.Screen name="index" />
                <Stack.Screen
                  name="game-center/index"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="game-center/GAME1"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="game-center/GAME2"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="game-center/GAME3"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="game-center/GAME4"
                  options={{ headerShown: false }}
                />
              </Stack>
            </StorageProvider>
          </CarouselProvider>
        </CharacterProvider>
      </OrientationProvider>
    </ThemeProvider>
  );
}
