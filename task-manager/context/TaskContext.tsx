import { createContext, useContext, useState, ReactNode } from "react";
import { Task } from "../types/task";

// Define the context: the data and actions
type TaskContextType = {
    tasks: Task[];
    addTask: (task: Task) => void;
    toggleTaskStatus: (id: string) => void;
    deleteTask: (id: string) => void;
  };

// Create the context
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Context Provider wraps the app and manages the shared task state
export const TaskProvider = ({ children }: { children: ReactNode }) => {
const [tasks, setTasks] = useState<Task[]>([]);

const addTask = (task: Task) => setTasks((prev) => [...prev, task]);

const toggleTaskStatus = (id: string) =>
    setTasks((prev) =>
    prev.map((task) =>
        task.id === id
        ? { ...task, status: task.status === "completed" ? "pending" : "completed" }
        : task
    )
    );

const deleteTask = (id: string) =>
    setTasks((prev) => prev.filter((task) => task.id !== id));

return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTaskStatus, deleteTask }}>
    {children}
    </TaskContext.Provider>
);

};

// Custom hook to use task context safely in any component
export function useTaskContext() {
const context = useContext(TaskContext);
if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
}
return context;
}