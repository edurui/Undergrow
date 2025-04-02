import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export interface Post {
  id: string;
  user: {
    name: string;
    avatarUrl?: string;
  };
  imageUrl: string;
  description?: string;
  commentCount?: number;
  likesCount?: number;
}

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const { width } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const currentColors = Colors[colorScheme ?? "light"];

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleLikePress = () => {
    setIsLiked((prev) => !prev);
    console.log(`Post ${post.id} ${!isLiked ? "Liked" : "Unliked"}`);
  };

  const handleCommentPress = () => {
    console.log(`Abrir comentarios para Post ${post.id}`);
    Alert.alert(
      "Comentarios",
      `Simulando apertura de comentarios para el post de ${post.user.name}.`
    );
  };

  const handleSavePress = () => {
    setIsSaved((prev) => !prev);
    console.log(`Post ${post.id} ${!isSaved ? "Saved" : "Unsaved"}`);
  };

  const styles = StyleSheet.create({
    container: {
      marginBottom: 15, 
      backgroundColor: currentColors.card,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 12,
      paddingVertical: 10,
    },
    avatar: {
      width: 35,
      height: 35,
      borderRadius: 17.5,
      marginRight: 10,
      backgroundColor: currentColors.border,
    },
    username: {
      fontWeight: "bold",
    },
    image: {
      width: width,
      height: width,
      backgroundColor: currentColors.border,
    },
    footer: {
      paddingHorizontal: 12,
      paddingVertical: 10,
    },
    actionsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    leftActions: {
      flexDirection: "row",
      alignItems: "center",
    },
    actionButton: {
      padding: 6,
      marginRight: 10,
    },
    icon: {
    },
    descriptionContainer: {
    },
    description: {
      lineHeight: 18,
    },
  });

  return (
    <View style={styles.container}>
      {/* Header (sin cambios) */}
      <View style={styles.header}>
        {post.user.avatarUrl ? (
          <Image source={{ uri: post.user.avatarUrl }} style={styles.avatar} />
        ) : (
          <View style={styles.avatar} />
        )}
        <ThemedText style={styles.username}>{post.user.name}</ThemedText>
      </View>

      {/* Imagen Principal (sin cambios) */}
      <Image source={{ uri: post.imageUrl }} style={styles.image} />

      {/* --- Footer Modificado --- */}
      <View style={styles.footer}>
        {/* --- Barra de Acciones --- */}
        <View style={styles.actionsContainer}>
          {/* Iconos Izquierda (Like, Comment) */}
          <View style={styles.leftActions}>
            <TouchableOpacity onPress={handleLikePress} style={styles.actionButton}>
              <Ionicons
                name={isLiked ? 'heart' : 'heart-outline'}
                size={26}
                color={isLiked ? 'red' : currentColors.text} // Rojo si liked
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCommentPress} style={styles.actionButton}>
              <Ionicons
                name="chatbubble-outline" // Icono siempre outline para comentar
                size={26}
                color={currentColors.text}
              />
            </TouchableOpacity>
            {/* Podrías añadir el icono de 'Share' aquí si quieres */}
          </View>

          {/* Icono Derecha (Guardar) */}
          <TouchableOpacity onPress={handleSavePress} style={styles.actionButton}>
            <Ionicons
              name={isSaved ? 'bookmark' : 'bookmark-outline'}
              size={26}
              color={currentColors.text} // Puedes hacerlo de otro color si quieres
            />
          </TouchableOpacity>
        </View>
        {/* --- Fin Barra de Acciones --- */}


        {/* Descripción (si existe) */}
        {post.description && (
          <View style={styles.descriptionContainer}>
            <ThemedText style={styles.description}>
              <ThemedText style={[styles.username, {marginRight: 5}]}>{post.user.name}</ThemedText>
              {' '} {/* Espacio entre nombre y descripción */}
              {post.description}
            </ThemedText>
          </View>
        )}

      </View>
    </View>
  );
};

export default PostItem;
