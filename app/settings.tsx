import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";
import { useTranslation } from "react-i18next";

const settingsOptions = [
  {
    id: "editProfile",
    icon: "pencil-outline",
    label: "Editar Perfil",
    route: "/edit-profile",
    i18nKey: "settings.editProfile",
  },
  {
    id: "likes",
    icon: "heart-outline",
    label: "Me gusta",
    route: "/liked-posts",
    i18nKey: "settings.likes",
  },
  {
    id: "saved",
    icon: "bookmark-outline",
    label: "Guardado",
    route: "/saved-posts",
    i18nKey: "settings.saved",
  },
  {
    id: "comments",
    icon: "chatbubble-ellipses-outline",
    label: "Comentarios",
    route: "/my-comments",
    i18nKey: "settings.comments",
  },
];

export default function SettingsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const currentColors = Colors[colorScheme ?? "light"];
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOptions = useMemo(() => {
    if (!searchQuery) {
      return settingsOptions;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    return settingsOptions.filter(
      (option) =>
        t(option.i18nKey || `settings.${option.id}`, option.label)
          .toLowerCase()
          .includes(lowerCaseQuery) ||
        option.label.toLowerCase().includes(lowerCaseQuery)
    );
  }, [searchQuery, t]);

  const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: currentColors.background },
    container: { flex: 1 },
    searchContainer: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: currentColors.border,
    },
    inputWrapper: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: currentColors.card,
      borderRadius: 8,
      height: 40,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: currentColors.border,
    },
    searchIcon: { marginRight: 8 },
    searchInput: {
      height: 41,
      flex: 1,
      fontSize: 16,
      color: currentColors.text,
    },
    scrollView: { flex: 1 },
    optionRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 15,
      paddingHorizontal: 15,
      borderBottomWidth: 1,
      borderBottomColor: currentColors.border,
    },
    optionLeft: {
      flexDirection: "row",
      alignItems: "center",
    },
    optionIcon: {
      marginRight: 15,
    },
    optionLabel: {
      fontSize: 16,
    },
    noResultsText: {
      textAlign: "center",
      marginTop: 30,
      color: currentColors.placeholder,
      fontSize: 16,
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: t("settings.title", "Configuración"),
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: currentColors.card },
          headerTintColor: currentColors.text,
        }}
      />

      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="search-outline"
              size={20}
              color={currentColors.placeholder}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder={t(
                "settings.searchPlaceholder",
                "Buscar en configuración..."
              )}
              placeholderTextColor={currentColors.placeholder}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Lista Filtrada de Opciones */}
        <ScrollView style={styles.scrollView}>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.optionRow}
                onPress={() => router.push(option.route as any)}
              >
                <View style={styles.optionLeft}>
                  <Ionicons
                    name={option.icon as any}
                    size={24}
                    color={currentColors.text}
                    style={styles.optionIcon}
                  />
                  <ThemedText style={styles.optionLabel}>
                    {t(option.i18nKey || `settings.${option.id}`, option.label)}
                  </ThemedText>
                </View>
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color={currentColors.placeholder}
                />
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noResultsText}>
              {t("settings.noResults", "No se encontraron resultados")}
            </Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
