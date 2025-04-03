import React from "react";
import { Tabs, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { TabBarIcon } from "@/components/navigations/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Image, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const headerLogo = require("../../assets/images/undergrow-logo-right-nobg.png");

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const currentColors = Colors[colorScheme ?? "light"];
  const router = useRouter();
  const { t } = useTranslation();

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
          headerShown: true,
          headerTitle: "",
          headerStyle: {
            backgroundColor: currentColors.background,
            height: 75,
          },
          headerLeft: () => (
            <Image
              source={headerLogo}
              style={{
                width: 170,
                height: 200,
                resizeMode: "contain",
              }}
            />
          ),
          title: t("tabs.feedTitle", "Inicio"),
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
          title: t("tabs.searchTitle", "Buscar"),
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
        name="addPost"
        options={{
          title: t("tabs.addPostTitle", "Añadir"),
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
          title: t("tabs.chatsTitle", "Chats"),
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "paper-plane" : "paper-plane-outline"}
              color={currentColors.primary}
            />
          ),
        }}
      />

      {/* --- Pestaña 5: Perfil --- */}
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: true,
          headerTitle: "Tu Nombre de Usuario",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: currentColors.card },
          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingRight: 10,
              }}
            >
              {/* Botón Añadir Post (+) */}
              <TouchableOpacity
                onPress={() => router.push("/addPost")}
                style={{ padding: 5, marginRight: 10 }}
              >
                <Ionicons
                  name="add-circle-outline"
                  size={28}
                  color={currentColors.text}
                />
              </TouchableOpacity>

              {/* Botón Ajustes (el que ya tenías) */}
              <TouchableOpacity
                onPress={() => router.push("/settings")}
                style={{ padding: 5 }}
              >
                <Ionicons
                  name="settings-outline"
                  size={24}
                  color={currentColors.text}
                />
              </TouchableOpacity>
            </View>
          ),
          title: t("tabs.profileTitle", "Perfil"),
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
