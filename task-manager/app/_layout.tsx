import { Stack } from "expo-router";

export default function RootLayout() {
  return (
  <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Task List" }}
      />
      <Stack.Screen 
        name="add"
        options={{ title: "Add New Task" }} />
    </Stack>
  )
}
