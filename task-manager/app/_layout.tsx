import { Stack } from "expo-router";
import { TaskProvider } from "../context/TaskContext";
import { SafeAreaView, StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <TaskProvider>
      <SafeAreaView style={styles.safeArea}>
      <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerShadowVisible: false, // hides the bottom border line
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}>
        <Stack.Screen
          name="index"
          options={{ title: "My Tasks" }}
        />
        <Stack.Screen
          name="add"
          options={{ title: "New Task"  }} />
      </Stack>
      </SafeAreaView>
    </TaskProvider>)
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
