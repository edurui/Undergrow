import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  FlatList,
  Image,
  View,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  Text,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { DUMMY_POSTS, Post } from "@/constants/dummyData";
import GridPostItem from "@/components/GridPostItem";
import PostItem from "@/components/PostItem";
import { useAuth } from "../../context/AuthContext";
import { ThemedText } from "@/components/ThemedText";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const MY_USERNAME = "usuario_a";
const MY_AVATAR_URL = "https://picsum.photos/seed/avatar1/150";
const MY_BIO =
  "Amante de la naturaleza y las fotos ☀️\nExplorando el mundo con React Native!";

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const currentColors = Colors[colorScheme ?? "light"];
  const { signOut, authState } = useAuth();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const myPosts = useMemo(() => {
    return DUMMY_POSTS.filter((p) => p.user.name === MY_USERNAME);
  }, []);

  const handlePostPress = (post: Post) => {
    setSelectedPost(post);
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
    setSelectedPost(null);
  };

  const handleLogout = async () => {
    await signOut();
  };

  const renderProfileHeader = () => (
    <View style={styles.profileHeader}>
      <View style={styles.headerTopRow}>
        <Image source={{ uri: MY_AVATAR_URL }} style={styles.profileAvatar} />
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <ThemedText style={styles.statNumber}>
              {String(myPosts.length)}
            </ThemedText>
            <ThemedText style={styles.statLabel}>Posts</ThemedText>
          </View>
          <View style={styles.statItem}>
            <ThemedText style={styles.statNumber}>{String(1234)}</ThemedText>
            <ThemedText style={styles.statLabel}>Seguidores</ThemedText>
          </View>
          <View style={styles.statItem}>
            <ThemedText style={styles.statNumber}>{String(567)}</ThemedText>
            <ThemedText style={styles.statLabel}>Siguiendo</ThemedText>
          </View>
        </View>
      </View>

      <View style={styles.bioContainer}>
        <ThemedText style={styles.profileUsername}>{MY_USERNAME}</ThemedText>
        <ThemedText style={styles.profileBio}>{MY_BIO}</ThemedText>
      </View>

      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => Alert.alert("Editar Perfil", "Próximamente...")}
        >
          <Text style={styles.actionButtonText}>Editar Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.logoutButton]}
          onPress={handleLogout}
        >
          <Text style={[styles.actionButtonText, styles.logoutButtonText]}>
            Cerrar Sesión
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderGridItem = ({ item }: { item: Post }) => (
    <GridPostItem post={item} onPress={() => handlePostPress(item)} />
  );

  const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: currentColors.background },
    profileHeader: { padding: 15 },
    headerTopRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 15,
    },
    profileAvatar: { width: 80, height: 80, borderRadius: 40, marginRight: 20 },
    statsContainer: {
      flexDirection: "row",
      flex: 1,
      justifyContent: "space-around",
    },
    statItem: { alignItems: "center" },
    statNumber: { fontWeight: "bold", fontSize: 16 },
    statLabel: { fontSize: 13, color: currentColors.placeholder },
    bioContainer: { marginBottom: 15 },
    profileUsername: { fontWeight: "bold", marginBottom: 4 },
    profileBio: { lineHeight: 18 },
    actionButtonsContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginBottom: 10,
    },
    actionButton: {
      flex: 1,
      marginHorizontal: 5,
      paddingVertical: 8,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: currentColors.border,
      alignItems: "center",
    },
    actionButtonText: { color: currentColors.text, fontWeight: "600" },
    logoutButton: { borderColor: "red" },
    logoutButtonText: { color: "red" },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 30,
      paddingHorizontal: 10,
    },
    modalContentContainer: {
      width: "95%",
      maxHeight: "90%",
      backgroundColor: currentColors.background,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    closeButton: {
      position: "absolute",
      top: 8,
      right: 8,
      backgroundColor: "rgba(0,0,0,0.6)",
      borderRadius: 16,
      padding: 6,
      zIndex: 10,
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={myPosts}
        renderItem={renderGridItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        ListHeaderComponent={renderProfileHeader}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPressOut={closeModal}
          >
            <Pressable
              style={styles.modalContentContainer}
              onPress={(e) => e.stopPropagation()}
            >
              <Pressable onPress={closeModal} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="white" />
              </Pressable>
              {selectedPost && <PostItem post={selectedPost} />}
            </Pressable>
          </TouchableOpacity>
        </GestureHandlerRootView>
      </Modal>
    </SafeAreaView>
  );
}
