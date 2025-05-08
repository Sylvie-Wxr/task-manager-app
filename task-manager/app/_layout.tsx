import { Stack } from "expo-router";
import { TaskProvider } from "../context/TaskContext";

export default function RootLayout() {
  return (
    <TaskProvider>
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
          options={{ title: "Add New Task" }} />
      </Stack>
    </TaskProvider>)
}
