import React from "react";
import { Tabs } from "expo-router";
import { TabBarIcon } from "@/components/navigations/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Pressable } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const currentColors = Colors[colorScheme ?? "light"];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: currentColors.tint,
        tabBarInactiveTintColor: currentColors.tabIconDefault,
        tabBarStyle: {
          backgroundColor: currentColors.card,
        },
        headerShown: false,
      }}
    >
      {/* --- Pestaña 1: Feed --- */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Feed",
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={currentColors.primary}
            />
          ),
        }}
      />

      {/* --- Pestaña 2: Buscar --- */}
      <Tabs.Screen
        name="search"
        options={{
          title: "Buscar",
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "search" : "search-outline"}
              color={currentColors.primary}
            />
          ),
        }}
      />

      {/* --- Pestaña 3: Añadir Publicación --- */}
      <Tabs.Screen
        name="addPost" // Necesita app/(tabs)/addPost.tsx
        options={{
          title: "Añadir",
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "add-circle" : "add-circle-outline"}
              color={currentColors.primary}
              size={32}
            />
          ),
        }}
      />

      {/* --- Pestaña 4: Mensajes --- */}
      <Tabs.Screen
        name="chats" // Necesita app/(tabs)/chats.tsx
        options={{
          title: "Chats",
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={
                focused ? "chatbubble-ellipses" : "chatbubble-ellipses-outline"
              }
              color={currentColors.primary}
            />
          ),
        }}
      />

      {/* --- Pestaña 5: Perfil --- */}
      <Tabs.Screen
        name="profile" // Necesita app/(tabs)/profile.tsx
        options={{
          title: "Perfil",
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person-circle" : "person-circle-outline"}
              color={currentColors.primary}
            />
          ),
        }}
      />
    </Tabs>
  );
}
