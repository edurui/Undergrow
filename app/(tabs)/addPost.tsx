import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
  SafeAreaView,
  ActivityIndicator,
  useWindowDimensions,
  Pressable,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { Camera, CameraView, CameraCapturedPicture } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useTranslation } from "react-i18next";

export default function AddPostScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const currentColors = Colors[colorScheme ?? "light"];
  const { t } = useTranslation();
  const { width } = useWindowDimensions();

  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | null
  >(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<
    boolean | null
  >(null);

  const [assets, setAssets] = useState<MediaLibrary.Asset[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<MediaLibrary.Asset | null>(
    null
  );
  const [takenPhoto, setTakenPhoto] = useState<CameraCapturedPicture | null>(
    null
  );
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [loadingAssets, setLoadingAssets] = useState(true);

  const cameraRef = useRef<CameraView>(null);

  // --- Estilos ---
  const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: currentColors.background },
    container: { flex: 1 },
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: currentColors.background,
      padding: 20,
    },
    cameraContainer: { flex: 1 },
    camera: { flex: 1 },
    captureButtonContainer: {
      position: "absolute",
      bottom: 20,
      alignSelf: "center",
    },
    captureButton: {
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: "white",
      borderWidth: 5,
      borderColor: "rgba(0,0,0,0.2)",
    },
    galleryContainer: { flex: 1, backgroundColor: currentColors.card },
    galleryList: { flex: 1 },
    galleryImage: { margin: 1, backgroundColor: "#e0e0e0" },
    galleryImageSelected: {
      borderWidth: 3,
      borderColor: currentColors.primary,
    },
    videoIcon: {
      position: "absolute",
      bottom: 5,
      right: 5,
      textShadowColor: "rgba(0, 0, 0, 0.75)",
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 1,
    },
    noAssetsText: {
      textAlign: "center",
      marginTop: 20,
      color: currentColors.placeholder,
    },
    previewContainer: { flex: 1, backgroundColor: "black" },
    previewImage: { flex: 1, resizeMode: "contain" },
    previewButtonsContainer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 20,
      paddingBottom: 30,
      backgroundColor: "rgba(0,0,0,0.4)",
    },
    previewButton: { alignItems: "center", padding: 10 },
    previewButtonText: { color: "white", marginTop: 4, fontWeight: "bold" },
    continueButton: {
      backgroundColor: currentColors.primary,
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 8,
      alignItems: "center",
    },
    continueButtonText: {
      color: currentColors.buttonText || "white",
      fontSize: 16,
      fontWeight: "bold",
    },
    continueButtonDisabled: { backgroundColor: currentColors.placeholder },
  });
  // --- Fin Estilos ---

  useEffect(() => {
    (async () => {
      console.log("Requesting permissions...");
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      console.log("Camera permission status:", cameraStatus.status);
      setHasCameraPermission(cameraStatus.status === "granted");

      const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
      console.log(
        "Media Library permission status:",
        mediaLibraryStatus.status
      );
      setHasMediaLibraryPermission(mediaLibraryStatus.status === "granted");
    })();
  }, []);

  useEffect(() => {
    if (hasMediaLibraryPermission) {
      console.log("Permission granted, loading assets...");
      loadAssets();
    } else if (hasMediaLibraryPermission === false) {
      console.log("Media Library permission denied.");
      setLoadingAssets(false);
    }
  }, [hasMediaLibraryPermission]);

  const loadAssets = async () => {
    setLoadingAssets(true);
    try {
      const result = await MediaLibrary.getAssetsAsync({
        first: 21,
        mediaType: [MediaLibrary.MediaType.photo, MediaLibrary.MediaType.video],
        sortBy: [MediaLibrary.SortBy.creationTime],
      });
      console.log(`Loaded ${result.assets.length} assets.`);
      setAssets(result.assets);
    } catch (e) {
      console.error("Error loading media library assets:", e);
      Alert.alert(
        t("common.errorTitle", "Error"),
        t(
          "addPost.galleryError",
          "No se pudieron cargar los elementos de la galería."
        )
      );
    } finally {
      setLoadingAssets(false);
    }
  };

  const takePicture = async () => {
    if (cameraRef.current && isCameraReady) {
      try {
        const photo: CameraCapturedPicture | undefined =
          await cameraRef.current.takePictureAsync({ quality: 0.7 });
        if (photo) {
          console.log("Photo taken:", photo.uri);
          setTakenPhoto(photo);
          setSelectedAsset(null);
        } else {
          console.warn("takePictureAsync did not return a photo object.");
          Alert.alert(
            t("common.errorTitle", "Error"),
            t("addPost.captureError", "No se pudo tomar la foto.")
          );
        }
      } catch (error) {
        console.error("Error taking picture:", error);
        Alert.alert(
          t("common.errorTitle", "Error"),
          t("addPost.captureError", "No se pudo tomar la foto.")
        );
      }
    } else {
      console.log("Camera not ready or ref not set");
    }
  };

  const selectAsset = (asset: MediaLibrary.Asset) => {
    setSelectedAsset(asset);
    setTakenPhoto(null);
    console.log("Selected Asset:", asset.uri);
  };

  const handleContinue = () => {
    const selectedUri = takenPhoto?.uri || selectedAsset?.uri;
    if (selectedUri) {
      console.log("Continuar con URI:", selectedUri);
      Alert.alert(
        t("addPost.continueAlertTitle", "Continuar"),
        t("addPost.continueAlertMessage", "Listo para continuar con: {{uri}}", {
          uri: selectedUri,
        })
      );
    }
  };

  const handleRetake = () => {
    setTakenPhoto(null);
  };

  const isContinueEnabled = !!takenPhoto || !!selectedAsset;

  // --- Renderizado condicional por permisos ---
  if (hasCameraPermission === null || hasMediaLibraryPermission === null) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={currentColors.primary} />
      </View>
    );
  }
  if (hasCameraPermission === false || hasMediaLibraryPermission === false) {
    return (
      <View style={styles.center}>
        <Text style={{ color: currentColors.text }}>
          {t("addPost.permissionNeeded")}
        </Text>
      </View>
    );
  }

  // --- Renderizado de items de galería ---
  const renderGalleryItem = ({ item }: { item: MediaLibrary.Asset }) => {
    const imageSize = width / 3 - 2;
    return (
      <TouchableOpacity onPress={() => selectAsset(item)}>
        <Image
          source={{ uri: item.uri }}
          style={[
            styles.galleryImage,
            { width: imageSize, height: imageSize },
            selectedAsset?.id === item.id && styles.galleryImageSelected,
          ]}
        />
        {item.mediaType === "video" && (
          <Ionicons
            name="videocam"
            size={16}
            color="white"
            style={styles.videoIcon}
          />
        )}
      </TouchableOpacity>
    );
  };

  // --- Renderizado Principal Condicional ---
  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen
        options={{
          title: t("addPost.title", "Nueva Publicación"),
          headerTitleAlign: "center",
        }}
      />

      {takenPhoto ? (
        // MODO PREVISUALIZACIÓN
        <View style={styles.previewContainer}>
          <Image source={{ uri: takenPhoto.uri }} style={styles.previewImage} />
          <View style={styles.previewButtonsContainer}>
            <TouchableOpacity
              onPress={handleRetake}
              style={styles.previewButton}
            >
              <Ionicons name="refresh-outline" size={28} color="white" />
              <Text style={styles.previewButtonText}>
                {t("addPost.retakeButton", "Rehacer")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.continueButton,
                !isContinueEnabled && styles.continueButtonDisabled,
              ]}
              disabled={!isContinueEnabled}
              onPress={handleContinue}
            >
              <Text style={styles.continueButtonText}>
                {t("addPost.continueButton", "Continuar")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        // MODO CAPTURA / SELECCIÓN
        <View style={styles.container}>
          <View style={styles.cameraContainer}>
            <CameraView
              ref={cameraRef}
              style={styles.camera}
              facing={"back"}
              onCameraReady={() => setIsCameraReady(true)}
            >
              <View style={styles.captureButtonContainer}>
                <TouchableOpacity
                  style={styles.captureButton}
                  onPress={takePicture}
                  disabled={!isCameraReady}
                />
              </View>
            </CameraView>
          </View>

          <View style={styles.galleryContainer}>
            {loadingAssets ? (
              <ActivityIndicator />
            ) : assets.length === 0 ? (
              <Text style={styles.noAssetsText}>
                {t("addPost.galleryEmpty")}
              </Text>
            ) : (
              <FlatList
                data={assets}
                renderItem={renderGalleryItem}
                keyExtractor={(item) => item.id}
                numColumns={3}
              />
            )}
          </View>
          {selectedAsset && (
            <View
              style={[
                styles.previewButtonsContainer,
                {
                  position: "relative",
                  paddingBottom: 15,
                  backgroundColor: currentColors.background,
                }, // Ajusta fondo y posición para este modo
              ]}
            >
              <View style={{ flex: 1 }} />
              <TouchableOpacity
                style={[
                  styles.continueButton,
                  !isContinueEnabled && styles.continueButtonDisabled,
                ]}
                disabled={!isContinueEnabled}
                onPress={handleContinue}
              >
                <Text style={styles.continueButtonText}>
                  {t("addPost.continueButton", "Continuar")}
                </Text>
              </TouchableOpacity>
              <View style={{ flex: 1 }} />
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}
