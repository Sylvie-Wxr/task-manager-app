import { View, StyleSheet } from "react-native";
import { Text, Button, Avatar } from "react-native-paper";
import { useLocalSearchParams, useRouter, useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { useTaskContext } from "../../context/TaskContext";
import TaskForm from "../../components/TaskForm";

export default function TaskDetailScreen() {
	const { id } = useLocalSearchParams(); // get dynamic id
	const { tasks, updateTask, deleteTask } = useTaskContext();  // Access tasks and updateTask from context
	const router = useRouter();
	const navigation = useNavigation();

	const task = tasks.find((t) => t.id === id); // Find the task with the matching id

	// State for editing
	const [isEditing, setIsEditing] = useState(false);
	const [title, setTitle] = useState(task?.title || "");
	const [description, setDescription] = useState(task?.description || "");
	const [status, setStatus] = useState<"pending" | "completed">(task?.status || "pending");

	// Screen title as Task Details when not editing
	// When edding, screen title is the task title
	useLayoutEffect(() => {
		if (task) {
			navigation.setOptions({
				title: isEditing ? task.title : "Task Details",
			});
		}
	}, [isEditing, task]);

	// If task is not found, show a message
	if (!task) {
		return <Text>Task not found</Text>;
	}

	// Handle save button
	const handleSave = () => {
		updateTask(task.id, { title, description, status });
		setIsEditing(false);
	};

	return (
		<View style={styles.container}>
			{/* When editing, go to edit mode; if not, view mode */}
			{isEditing ? (
				// Edit mode, use the TaskForm component
				<TaskForm
					title={title}
					description={description}
					status={status}
					onChangeTitle={setTitle}
					onChangeDescription={setDescription}
					onChangeStatus={setStatus}
					onSubmit={handleSave}
					onCancel={() => setIsEditing(false)}
					submitLabel="Save"
				/>
			) : (
				// View mode: show task details
				<>
					{/* Task Detail Card */}
					<View style={styles.detailCard}>
						<View style={styles.headerRow}>
							<Avatar.Icon
								icon="clipboard-text-outline"
								size={40}
								style={styles.iconAvatar}
								color="#fff"
							/>
							<Text style={styles.cardTitle}>{task.title}</Text>
						</View>

						{/* Title Section */}
						<View style={styles.section}>
							<Text style={styles.label}>TITLE</Text>
							<Text style={styles.value}>{task.title}</Text>
						</View>

						{/* Description Section */}
						<View style={styles.section}>
							<Text style={styles.label}>DESCRIPTION</Text>
							<Text style={styles.value}>{task.description}</Text>
						</View>

						{/* Status Section */}
						<View style={styles.section}>
							<Text style={styles.label}>STATUS</Text>
							<Text style={styles.value}>
								{task.status === "completed" ? "Completed" : "Pending"}
							</Text>
						</View>
					</View>

				</>
			)}

			{/* Edit & Delete (only in view mode) */}
			{!isEditing && (
				<>
					<Button
						icon="pencil"
						mode="contained"
						onPress={() => setIsEditing(true)}
						buttonColor="#8c7cde"
						textColor="#fff"
					>
						Edit
					</Button>
					<Button
						icon="delete"
						mode="outlined"
						onPress={() => {
							deleteTask(task.id);
							router.back();
						}}

						style={{ marginTop: 16 }}
					>
						Delete
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
	detailCard: {
		backgroundColor: "#ffffff",
		borderRadius: 16,
		padding: 20,
		marginBottom: 32,
		borderWidth: 1,
		borderColor: "#e4e4ed",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 4,
		elevation: 2,
	},
	headerRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 30,
	},
	cardTitle: {
		fontSize: 22,
		fontWeight: "bold",
	},
	section: {
		marginBottom: 20,
	},
	label: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#7a6fc9",
		marginBottom: 8,
	},
	value: {
		fontSize: 16,
		color: "#222",
	},
	iconAvatar: {
		backgroundColor: "#8c7cde",
		marginRight: 12,
	},
});