import { View, StyleSheet } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { useLocalSearchParams, useRouter, useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { useTaskContext } from "../../context/TaskContext";

export default function TaskDetailScreen() {
	const { id } = useLocalSearchParams(); // get dynamic id
	const { tasks } = useTaskContext();
  const router = useRouter();
  const navigation = useNavigation();

	const task = tasks.find((t) => t.id === id);

	// Dynamically set the screen title
  useLayoutEffect(() => {
    if (task) {
      navigation.setOptions({ title: task.title });
    }
  }, [task]);

  if (!task) {
    return <Text>Task not found</Text>;
  }

	return (
		<View style={styles.container}>
			<Text variant="titleLarge">{task.title}</Text>
			<Text>{task.description}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: "#fff",
  },
  input: {
    marginBottom: 16,
  },
});