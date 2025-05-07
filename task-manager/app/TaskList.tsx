import { FlatList, StyleSheet, View } from "react-native";
import { Button, Card, Checkbox, IconButton, Text } from "react-native-paper";
import { useState } from "react";
import { Task } from "../types/task";
import { Link } from "expo-router";


// Mock sample task data
const initialTasks: Task[] = [
  { id: "1", title: "Task 1", description: "This is the description for task 1", status: "pending" },
  { id: "2", title: "Task 2", description: "This is the description for task 2", status: "completed" },
  { id: "3", title: "Task 3", description: "This is the description for task 3", status: "pending" },
  { id: "4", title: "Task 4", description: "This is the description for task 4", status: "pending" },
  { id: "5", title: "Task 5", description: "This is the description for task 5", status: "completed" },
  { id: "6", title: "Task 6", description: "This is the description for task 6", status: "completed" },
  { id: "7", title: "Task 7", description: "This is the description for task 7", status: "pending" },
  { id: "8", title: "Task 8", description: "This is the description for task 8", status: "pending" },
];

export default function Index() {
  // List of tasks
  const [tasks, setTasks] = useState(initialTasks)

  // Delete action
  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Toggle task status between "pending" and "completed"
  const toggleStatus = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: t.status === "completed" ? "pending" : "completed",
            }
          : t
      )
    );
  };


  return (
    <View
      style={styles.container}
    >
      <View style={styles.header}>
        <Text variant="titleLarge">Task List</Text>
        {/* TODO: navigate to add task screen */}
        <Link href={"/add"} asChild>
          <Button mode="contained">New</Button>
        </Link>
      </View>
      
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Card style={styles.card} mode="elevated">
            <Card.Content style={styles.cardContent}>
              <Checkbox
                status={item.status === "completed" ? "checked" : "unchecked"}
                // TODO: Enable check
                onPress={() => toggleStatus(item.id)}
              />
              {/* Task title display */}
              <Text style={styles.title}>{item.title}</Text>
              {/* Edit and delete icons */}
              <View style={styles.actions}>
              {/* TODO: Navigate to edit-task screen */}
                <IconButton icon="pencil" onPress={() => {}} />
                <IconButton icon="delete" onPress={() => handleDelete(item.id)} />
              </View>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: "#F5F5F5", // Light gray background
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  card: {
    marginBottom: 12,
    borderRadius: 12,
  },
  cardContent: {
    flexDirection: "row", // Items (checkbox, title, actions) in a row
    alignItems: "center",
  },
  title: {
    flex: 1,
    fontSize: 16,
  },
  actions: {
    flexDirection: "row", // Action icons next to each other
  },
});
