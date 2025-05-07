import { Stack } from "expo-router";
import { TaskProvider } from "../context/TaskContext";

export default function RootLayout() {
  return (
    <TaskProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ title: "Task List" }}
        />
        <Stack.Screen
          name="add"
          options={{ title: "Add New Task" }} />
      </Stack>
    </TaskProvider>)
}
