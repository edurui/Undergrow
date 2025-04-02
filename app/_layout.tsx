import React, { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import "../localization/i18n.config";

export { ErrorBoundary } from "expo-router";

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

function RootLayoutNav() {
  const { authState, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const currentColors = Colors[colorScheme ?? "light"];

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "auth";

    console.log(
      "Auth State Changed:",
      authState?.isAuthenticated,
      "Current Segment:",
      segments[0]
    );

    if (authState?.isAuthenticated && inAuthGroup) {
      console.log("Redirecting to (tabs)...");
      router.replace("/(tabs)");
    } else if (!authState?.isAuthenticated && !inAuthGroup) {
      console.log("Redirecting to auth...");
      router.replace("/auth");
    }
  }, [authState?.isAuthenticated, isLoading, segments]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: currentColors.background,
        }}
      >
        <ActivityIndicator size="large" color={currentColors.primary} />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
