import Loader from "@/components/loader";
// import {
//   DarkTheme,
//   DefaultTheme,
//   ThemeProvider,
// } from "@react-navigation/native";
import { router, Stack, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import "../global.css";

import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";

import AppInitializer from "@/components/app-initializer";
import { Colors } from "@/constants/theme";
import { useAppSelector } from "@/hooks/redux";
import { persistor, store } from "@/store";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

// Disable Reanimated strict mode warning (caused by internal hooks accessing shared values during render)
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function AuthGate() {
  const segments = useSegments();

  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const colorScheme = useColorScheme();

  useEffect(() => {
    const firstSegment = segments[0] as string | undefined;
    const inPublicGroup = firstSegment === "(public)";
    const inOnboardingGroup = firstSegment === "(onboarding)";
    const inVerifyEmailGroup = firstSegment === "(verifyEmail)";
    const inAuthGroup = firstSegment === "(auth)";

    const safeRedirect = (path: string) => {
      setTimeout(() => {
        router.replace(path as any);
      }, 0);
    };

    if (!isAuthenticated) {
      // Unauthenticated users must be restricted to the auth group
      if (!inAuthGroup) {
        safeRedirect("/(auth)/signin");
      }
    } else {
      // Authenticated users
      if (!user?.is_onboarding_complete) {
        // Must complete onboarding first
        if (!inOnboardingGroup) {
          safeRedirect("/(onboarding)");
        }
      } else if (!user?.is_email_verified) {
        // Must verify email next
        if (!inVerifyEmailGroup) {
          safeRedirect("/(verifyEmail)");
        }
      } else {
        // Fully authenticated, onboarded, and verified users go to the main area (public)
        if (!inPublicGroup) {
          safeRedirect("/(public)");
        }
      }
    }
  }, [
    isAuthenticated,
    segments,
    user?.is_onboarding_complete,
    user?.is_email_verified,
  ]);

  return (
    <SafeAreaView
      className="flex-1 pt-0"
      style={{
        backgroundColor: Colors[colorScheme as "dark" | "light"].background,
      }}
    >
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      ></Stack>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Let splash screen stay briefly, then hide it and transition to our custom react loader
        await new Promise((resolve) => setTimeout(resolve, 500));
        await SplashScreen.hideAsync();

        // Let the custom loader show for a short time to finish initial setup/loading
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return <Loader />;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Loader />}>
        <AppInitializer />
        <AuthGate />
        <Toast />
      </PersistGate>
    </Provider>
  );
}
