import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet } from 'react-native';

export default function ChatsScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Pantalla de Chats</ThemedText>
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});