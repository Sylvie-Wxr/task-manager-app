import { View, StyleSheet } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { useLocalSearchParams, useRouter, useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { useTaskContext } from "../../context/TaskContext";

export default function TaskDetailScreen() {
	const { id } = useLocalSearchParams(); // get dynamic id
	const { tasks, updateTask } = useTaskContext();  // Access tasks and updateTask from context
  const router = useRouter();
  const navigation = useNavigation();

  // Find the task with the matching id
	const task = tasks.find((t) => t.id === id);

  // State for editing
	const [isEditing, setIsEditing] = useState(false);
	const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");

	// Set the screen title
  useLayoutEffect(() => {
    if (task) {
      navigation.setOptions({ title: task.title });
    }
  }, [task]);

  // If task is not found, show a message
  if (!task) {
    return <Text>Task not found</Text>;
  }

  // Handle save button
	const handleSave = () => {
    updateTask(task.id, { title, description });
    setIsEditing(false);
  };

	return (
		<View style={styles.container}>
			<View style={styles.detailCard}>
			{isEditing ? (
        // Edit mode
        <>
          <TextInput label="Title" value={title} onChangeText={setTitle} mode="outlined" style={styles.input} />
          <TextInput label="Description" value={description} onChangeText={setDescription} mode="outlined" multiline style={styles.input} />
					<Button mode="contained" onPress={handleSave}>Save</Button>
          <Button onPress={() => setIsEditing(false)}>Cancel</Button>
        </>
      ) : (
        // View mode: show task details
        <>
			<Text variant="titleMedium" style={styles.label}>Title</Text>
          <Text style={styles.text}>{task.title}</Text>

          <Text variant="titleMedium" style={styles.label}>Description</Text>
          <Text style={styles.text}>{task.description}</Text>

          <Text variant="titleMedium" style={styles.label}>Status</Text>
          <Text style={styles.text}>{task.status}</Text>

         
			</>
			)}
			</View>
			 {/* Edit button */}
			 {!isEditing && (
    <Button
      icon="pencil"
      mode="outlined"
      onPress={() => setIsEditing(true)}
    >
      Edit
    </Button>
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
	detailCard: {
		backgroundColor: "#f7f6fa",
		borderRadius: 12,
		padding: 20,
		marginBottom: 50,
		elevation: 2, // subtle shadow
	},
  input: {
    marginBottom: 24,
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