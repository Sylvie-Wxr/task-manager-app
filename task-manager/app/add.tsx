import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, TextInput, RadioButton } from "react-native-paper";
import { Task } from "../types/task";
import { useTaskContext } from "../context/TaskContext";

export default function AddTaskScreen() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [status, setStatus] = useState<"pending" | "completed">("pending");
	const router = useRouter();
	// Access addTask function from context
	const { addTask } = useTaskContext();

	// Handle save button
	const handleSave = () => {
		// Create a new task object
		const newTask: Task = {
			id: Date.now().toString(), // use Date to create id
			title,
			description,
			status,
		};

		// Add the task using context method
		addTask(newTask);
		// console.log("Saving task with status:", status);
		router.back(); // Navigate back to the task list screen
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1 }}
		>
			<ScrollView contentContainerStyle={styles.container}>
				<View style={styles.headerContainer}>
					<Text style={styles.headerText}>New Task</Text>
				</View>


				<View style={styles.inputGroup}>
					<Text style={styles.label}>Title</Text>
					<TextInput
						mode="outlined"
						placeholder="e.g., Grocery Shopping"
						value={title}
						onChangeText={setTitle}
						style={styles.input}
					/>
				</View>


				<View style={styles.inputGroup}>
					<Text style={styles.label}>Description</Text>
					<TextInput
						mode="outlined"
						placeholder="Details about the task..."
						value={description}
						onChangeText={setDescription}
						multiline
						numberOfLines={6}
						style={styles.discrptiontextArea}
					/>
				</View>

				<View style={styles.inputGroup}>
					<Text style={styles.label}>Status</Text>
					<RadioButton.Group onValueChange={value => setStatus(value as "pending" | "completed")} value={status}>
						<View style={styles.radioRow}>
							<RadioButton value="pending" />
							<Text>Pending</Text>
						</View>
						<View style={styles.radioRow}>
							<RadioButton value="completed" />
							<Text>Completed</Text>
						</View>
					</RadioButton.Group>
				</View>

				{/* Save Button */}
				<Button
					mode="contained"
					onPress={handleSave}
					buttonColor="#8c7cde"
					disabled={title.trim() === ""}
					style={styles.submitButton}
				>
					Save
				</Button>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		flex: 1,
		backgroundColor: "#fff",
	},
	headerContainer: {
		backgroundColor: "#f6f2f9",
		paddingVertical: 20,
		paddingHorizontal: 20,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		position: "relative",
		marginBottom: 40,
		borderRadius: 16,
	},

	headerText: {
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
		flex: 1,
	},

	inputGroup: {
		marginBottom: 25,
	},
	label: {
		marginBottom: 10,
		fontSize: 14,
		fontWeight: "600",
	},
	input: {
		backgroundColor: "#fff",
	},
	discrptiontextArea: {
		backgroundColor: "#fff",
		height: 160,
		textAlignVertical: "top",
	},
	radioRow: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 6,
	},
	submitButton: {
		marginTop: 24,
		paddingVertical: 6,
		color: "#bb91de",
	},
})
	;