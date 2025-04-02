// (Similar al de Search, solo cambia el texto)
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";

export default function AddPostScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Pantalla Añadir Post (Placeholder)</ThemedText>
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
