import React, { useState } from "react";
import {
  StyleSheet,
  FlatList,
  TextInput,
  View,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { DUMMY_POSTS, Post } from "@/constants/dummyData";
import GridPostItem from "@/components/GridPostItem";
import PostItem from "@/components/PostItem";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function SearchScreen() {
  const colorScheme = useColorScheme();
  const currentColors = Colors[colorScheme ?? "light"];
  const [searchQuery, setSearchQuery] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handlePostPress = (post: Post) => {
    setSelectedPost(post);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedPost(null);
  };

  const filteredPosts = DUMMY_POSTS;

  const renderGridItem = ({ item }: { item: Post }) => (
    <GridPostItem post={item} onPress={() => handlePostPress(item)} />
  );

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: currentColors.background,
    },
    container: {
      flex: 1,
    },
    searchContainer: {
      padding: 10,
      paddingVertical: 15,
      backgroundColor: currentColors.background,
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
    searchIcon: {
      position: "absolute",
      marginLeft: 8,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: currentColors.text,
      height: 41,
      paddingLeft: 25,
      alignItems: "center",
    },
    list: {},
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 30,
      paddingHorizontal: 10,
      overflow: "hidden",
    },
    modalContentContainer: {
      width: "95%",
      maxHeight: "90%",
      backgroundColor: currentColors.background,
    },
    closeButton: {
      position: "absolute",
      top: 8,
      right: 8,
      backgroundColor: "rgba(0,0,0,0.6)",
      borderRadius: 12,
      padding: 6,
      zIndex: 10,
    },
  });
  // --- Fin Estilos ---

  return (
    <SafeAreaView style={styles.safeArea}>
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
              placeholder="Buscar" // TODO: i18n
              placeholderTextColor={currentColors.placeholder}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Cuadrícula de Posts */}
        <FlatList
          style={styles.list}
          data={filteredPosts}
          renderItem={renderGridItem}
          keyExtractor={(item) => item.id}
          numColumns={3} // ¡Clave para la cuadrícula!
          showsVerticalScrollIndicator={false}
          // Podrías añadir Pull-to-refresh aquí si quieres
        />

        {/* --- Modal para ver el Post Completo --- */}
        <Modal
          animationType="fade" // O 'slide'
          transparent={true} // Necesario para ver el fondo difuminado
          visible={modalVisible}
          onRequestClose={closeModal} // Para el botón 'atrás' de Android
        >
          <GestureHandlerRootView style={{ flex: 1 }}>
            {/* Overlay/Fondo */}
            <TouchableOpacity
              style={styles.modalOverlay}
              activeOpacity={1} // Evita que el fondo parpadee al pulsar
              onPressOut={closeModal} // Cierra el modal al tocar fuera del contenido
            >
              {/* Contenedor del Contenido del Modal */}
              <Pressable
                style={styles.modalContentContainer}
                onPress={(e) => e.stopPropagation()} // Evita que el toque se propague al overlay
              >
                {/* Botón de Cerrar (Opcional pero útil) */}
                <Pressable onPress={closeModal} style={styles.closeButton}>
                  <Ionicons name="close" size={24} color="white" />
                </Pressable>

                {/* Renderiza el PostItem completo si hay un post seleccionado */}
                {selectedPost && <PostItem post={selectedPost} />}
              </Pressable>
            </TouchableOpacity>
          </GestureHandlerRootView>
        </Modal>
        {/* --- Fin Modal --- */}
      </View>
    </SafeAreaView>
  );
}
