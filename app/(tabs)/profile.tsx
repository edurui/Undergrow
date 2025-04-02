import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button, StyleSheet } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function ProfileScreen() {
  const { signOut } = useAuth();
  const colorScheme = useColorScheme();
  const currentColors = Colors[colorScheme ?? "light"];

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Pantalla de Perfil</ThemedText>
      <Button
        title="Cerrar Sesión"
        onPress={handleLogout}
        color={currentColors.primary}
      />
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
});
