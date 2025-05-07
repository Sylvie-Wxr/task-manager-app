import { View, StyleSheet } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { useLocalSearchParams, useRouter, useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { useTaskContext } from "../../context/TaskContext";

export default function TaskDetailScreen() {
	const { id } = useLocalSearchParams(); // get dynamic id
	const { tasks, updateTask } = useTaskContext();
  const router = useRouter();
  const navigation = useNavigation();

	const task = tasks.find((t) => t.id === id);
	const [isEditing, setIsEditing] = useState(false);
	const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");

	// Set the screen title
  useLayoutEffect(() => {
    if (task) {
      navigation.setOptions({ title: task.title });
    }
  }, [task]);

  if (!task) {
    return <Text>Task not found</Text>;
  }

	const handleSave = () => {
    updateTask(task.id, { title, description });
    setIsEditing(false);
  };

	return (
		<View style={styles.container}>
			{isEditing ? (
        <>
          <TextInput label="Title" value={title} onChangeText={setTitle} mode="outlined" style={styles.input} />
          <TextInput label="Description" value={description} onChangeText={setDescription} mode="outlined" multiline style={styles.input} />
					<Button mode="contained" onPress={handleSave}>Save</Button>
          <Button onPress={() => setIsEditing(false)}>Cancel</Button>
        </>
      ) : (
        <>
			<Text variant="titleMedium" style={styles.label}>Title</Text>
          <Text style={styles.text}>{task.title}</Text>

          <Text variant="titleMedium" style={styles.label}>Description</Text>
          <Text style={styles.text}>{task.description}</Text>

          <Text variant="titleMedium" style={styles.label}>Status</Text>
          <Text style={styles.text}>{task.status}</Text>

          <Button icon="pencil" mode="outlined" onPress={() => setIsEditing(true)}>
            Edit
          </Button>
			</>
			)}
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
	header: {
    marginBottom: 16,
  },
  label: {
    marginTop: 12,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
});