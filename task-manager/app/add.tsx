import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet} from "react-native";
import { Task } from "../types/task";
import TaskForm from "../components/TaskForm";
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
			<TaskForm
        header="New Task"
        title={title}
        description={description}
        status={status}
        onChangeTitle={setTitle}
        onChangeDescription={setDescription}
        onChangeStatus={setStatus}
        onSubmit={handleSave}
      />
		</KeyboardAvoidingView>
	);
}

