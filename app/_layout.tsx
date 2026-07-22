import Loader from "@/components/loader";
import { Redirect, Stack, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import "../global.css";

import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";

import AppInitializer from "@/components/app-initializer";
import ThemeInitializer from "@/components/theme-initializer";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useAppSelector } from "@/hooks/redux";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { persistor, store } from "@/store";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

// Disable Reanimated strict mode warning (caused by internal hooks accessing shared values during render)
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function getAuthRedirectPath(
  isAuthenticated: boolean,
  isOnboardingComplete: number | undefined,
  isEmailVerified: boolean | undefined,
  segments: string[],
): string | null {
  const firstSegment = segments[0];
  const inPublicGroup = firstSegment === "(public)";
  const inOnboardingGroup = firstSegment === "(onboarding)";
  const inVerifyEmailGroup = firstSegment === "(verifyEmail)";
  const inAuthGroup = firstSegment === "(auth)";

  if (!isAuthenticated) {
    return inAuthGroup ? null : "/(auth)/signin";
  }

  if (!isOnboardingComplete) {
    return inOnboardingGroup ? null : "/(onboarding)";
  }

  if (!isEmailVerified) {
    return inVerifyEmailGroup ? null : "/(verifyEmail)";
  }

  return inPublicGroup ? null : "/(public)";
}

function AuthGate() {
  const segments = useSegments();

  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  const redirectPath = getAuthRedirectPath(
    isAuthenticated,
    user?.is_onboarding_complete,
    user?.is_email_verified,
    segments,
  );

  if (redirectPath) {
    return <Redirect href={redirectPath as any} />;
  }

  return (
    <ThemedView
      className="flex-1 pt-0"
      style={{
        backgroundColor: Colors[colorScheme as "dark" | "light"].surfacePage,
        paddingTop: insets.top,
      }}
    >
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      ></Stack>
      <StatusBar style="auto" />
    </ThemedView>
  );
}

function BootLoader({ onReady }: { onReady?: () => void }) {
  return (
    <View style={styles.loaderOverlay} onLayout={onReady}>
      <Loader />
    </View>
  );
}

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const splashHidden = useRef(false);

  const hideSplash = useCallback(() => {
    if (splashHidden.current) return;
    splashHidden.current = true;
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep custom loader visible briefly while app tree mounts / rehydrates
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        {(isRehydrated) => (
          <View style={styles.root}>
            <AppInitializer />
            <ThemeInitializer />
            <AuthGate />
            <Toast />
            {(!isRehydrated || !appIsReady) && (
              <BootLoader onReady={hideSplash} />
            )}
          </View>
        )}
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFill,
    zIndex: 100,
  },
});
