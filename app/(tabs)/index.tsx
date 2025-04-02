import React from "react";
import { FlatList, StyleSheet, SafeAreaView } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import PostItem, { Post } from "@/components/PostItem";

const DUMMY_POSTS: Post[] = [
  {
    id: "1",
    user: { name: "usuario_a" },
    imageUrl: "https://picsum.photos/seed/1/500",
    description: "¡Mi primera foto! ☀️ #naturaleza",
  },
  {
    id: "2",
    user: {
      name: "dev_world",
      avatarUrl: "https://picsum.photos/seed/avatar2/50",
    },
    imageUrl: "https://picsum.photos/seed/2/500",
    description: "Programando...",
  },
  {
    id: "3",
    user: { name: "viajero_xyz" },
    imageUrl: "https://picsum.photos/seed/3/500",
  },
  {
    id: "4",
    user: { name: "foodie_lover" },
    imageUrl: "https://picsum.photos/seed/4/500",
    description: "Comida deliciosa 🍕",
  },
  {
    id: "5",
    user: { name: "arte_abstracto" },
    imageUrl: "https://picsum.photos/seed/5/500",
    description: "Explorando formas y colores.",
  },
  {
    id: "6",
    user: { name: "usuario_a" },
    imageUrl: "https://picsum.photos/seed/6/500",
    description: "Otra foto más.",
  },
  {
    id: "7",
    user: {
      name: "dev_world",
      avatarUrl: "https://picsum.photos/seed/avatar2/50",
    },
    imageUrl: "https://picsum.photos/seed/7/500",
    description: "Compilando... espera.",
  },
  {
    id: "8",
    user: { name: "viajero_xyz" },
    imageUrl: "https://picsum.photos/seed/8/500",
    description: "Atardecer increíble.",
  },
];

export default function FeedScreen() {
  const colorScheme = useColorScheme();
  const currentColors = Colors[colorScheme ?? "light"];

  const renderPost = ({ item }: { item: Post }) => <PostItem post={item} />;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: currentColors.background }]}
    >
      <FlatList
        data={DUMMY_POSTS}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
