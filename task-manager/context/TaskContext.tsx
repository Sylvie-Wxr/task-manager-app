import { createContext, useContext, useState, ReactNode } from "react";
import { Task } from "../types/task";

// Define the context: the data and actions
type TaskContextType = {
    tasks: Task[];
    addTask: (task: Task) => void;
    toggleTaskStatus: (id: string) => void;
    deleteTask: (id: string) => void;
    updateTask: (
			id: string, updates: Pick<Task, "title" | "description" | "status">
		) => void;
  };

// Create the context
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Context Provider wraps the app and manages the shared task state
export const TaskProvider = ({ children }: { children: ReactNode }) => {
const [tasks, setTasks] = useState<Task[]>([]); // State to store all tasks

// Add a new task to the list
const addTask = (task: Task) => setTasks((prev) => [...prev, task]);

// Toggle task status between "completed" and "pending"
const toggleTaskStatus = (id: string) =>
    setTasks((prev) =>
    prev.map((task) =>
        task.id === id
        ? { ...task, status: task.status === "completed" ? "pending" : "completed" }
        : task
    )
    );

// Delete a task by filtering it out
const deleteTask = (id: string) =>
    setTasks((prev) => prev.filter((task) => task.id !== id));

// Update task title, description, or status
const updateTask = (
	id: string, updates: Pick<Task, "title" | "description" | "status">
) =>
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, ...updates } // Update this task's fields
        : task // Keep others unchanged
      )
    );

return (
    // Provide all task operations and state to child components
    <TaskContext.Provider value={
			{ 
				tasks, addTask, toggleTaskStatus, deleteTask, updateTask 
				}
		}>
    {children}
    </TaskContext.Provider>
);

};

// Custom hook to use task context safely in any component
export function useTaskContext() {
const context = useContext(TaskContext);

// Ensure the hook is used within a TaskProvider
if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
}
return context;
}