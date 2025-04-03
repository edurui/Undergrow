import React, { useState, useEffect } from "react";
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
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Post } from "@/constants/dummyData";

import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from 'react-native-reanimated';

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const { width } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const currentColors = Colors[colorScheme ?? "light"];

  const [isLiked, setIsLiked] = useState<boolean>(
    post.isLikedByCurrentUser ?? false
  );
  const [isSaved, setIsSaved] = useState<boolean>(
    post.isSavedByCurrentUser ?? false
  );
  const [currentLikeCount, setCurrentLikeCount] = useState<number>(
    post.likeCount
  );

  const timeAgo = formatDistanceToNow(post.createdAt, {
    addSuffix: true,
    locale: es,
  });

  const handleLikePress = () => {
    try {
      setIsLiked((prev) => {
        const newIsLiked = !prev;
        setCurrentLikeCount((count) => (newIsLiked ? count + 1 : count - 1));
        return newIsLiked;
      });
    } catch (error) {
      console.error("Error al dar like:", error);
    }
  };

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd((_event, success) => {
      if (success) {
        runOnJS(handleLikePress)();
      }
    });

  const handleCommentPress = () => {
    Alert.alert(
      "Comentarios",
      `Simulando apertura de comentarios (${post.commentCount}) para el post de ${post.user.name}.`
    );
  };

  const handleSavePress = () => {
    setIsSaved((prev) => !prev);
  };

  const styles = StyleSheet.create({
    container: {
      marginBottom: 5,
      backgroundColor: currentColors.background,
    },
    imageContainer: {
      backgroundColor: currentColors.border,
      width: "100%",
      height: undefined,
    },
    mainImage: {
      width: "100%",
      height: undefined,
      aspectRatio: 1,
    },
    overlayHeader: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      flexDirection: "row",
      alignItems: "center",
      padding: 12,
    },
    avatar: {
      width: 32,
      height: 32,
      borderRadius: 16,
      marginRight: 8,
      backgroundColor: currentColors.border,
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.8)",
    },
    usernameHeader: {
      fontWeight: "bold",
      color: "#ffffff",
      textShadowColor: "rgba(0, 0, 0, 0.75)",
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
    footer: {
      paddingHorizontal: 12,
      paddingTop: 10,
      paddingBottom: 10,
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
    infoContainer: {},
    likesText: {
      fontWeight: "bold",
      marginBottom: 4,
    },
    description: {
      lineHeight: 18,
      marginBottom: 4,
    },
    usernameDescription: {
      fontWeight: "bold",
      marginRight: 4,
    },
    commentsLink: {
      color: currentColors.placeholder,
      marginBottom: 4,
    },
    dateText: {
      color: currentColors.placeholder,
      fontSize: 12,
      textTransform: "uppercase",
    },
  });

  return (
    <View style={styles.container}>
      <GestureDetector gesture={doubleTapGesture}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: post.imageUrl }} style={styles.mainImage} />
          <View style={styles.overlayHeader}>
            {post.user.avatarUrl ? (
              <Image
                source={{ uri: post.user.avatarUrl }}
                style={styles.avatar}
              />
            ) : (
              <View style={styles.avatar} />
            )}
            <ThemedText style={styles.usernameHeader}>
              {post.user.name}
            </ThemedText>
          </View>
        </View>
      </GestureDetector>

      <View style={styles.footer}>
        <View style={styles.actionsContainer}>
          <View style={styles.leftActions}>
            <TouchableOpacity
              onPress={handleLikePress}
              style={styles.actionButton}
            >
              <Ionicons
                name={isLiked ? "heart" : "heart-outline"}
                size={28}
                color={isLiked ? "red" : currentColors.text}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCommentPress}
              style={styles.actionButton}
            >
              <Ionicons
                name="chatbubble-outline"
                size={27}
                color={currentColors.text}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={handleSavePress}
            style={styles.actionButton}
          >
            <Ionicons
              name={isSaved ? "bookmark" : "bookmark-outline"}
              size={27}
              color={currentColors.text}
            />
          </TouchableOpacity>
        </View>

        {currentLikeCount > 0 && (
          <ThemedText style={styles.likesText}>
            {currentLikeCount.toLocaleString("es-ES")}{" "}
            {currentLikeCount === 1 ? "Me gusta" : "Me gusta"}
          </ThemedText>
        )}

        {post.description && (
          <ThemedText style={styles.description} numberOfLines={2}>
            <ThemedText style={styles.usernameDescription}>
              {post.user.name}
            </ThemedText>{" "}
            {post.description}
          </ThemedText>
        )}

        {post.commentCount > 0 && (
          <TouchableOpacity onPress={handleCommentPress}>
            <ThemedText style={styles.commentsLink}>
              Ver los {post.commentCount} comentarios
            </ThemedText>
          </TouchableOpacity>
        )}

        <ThemedText style={styles.dateText}>{timeAgo}</ThemedText>
      </View>
    </View>
  );
};

export default PostItem;
