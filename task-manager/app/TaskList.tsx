import { Link, useRouter } from "expo-router";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Card, Checkbox, IconButton, Text, Searchbar } from "react-native-paper";
import { useTaskContext } from "@/context/TaskContext";
import { useState } from "react";

export default function TaskList() {
  // Access tasks and actions from context
  const { tasks, toggleTaskStatus, deleteTask } = useTaskContext();
  const router = useRouter(); // initialize router

  const [searchQuery, setSearchQuery] = useState("");

  // Filter by title
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View
      style={styles.container}
    >
      {/* Search bar */}
      <Searchbar
        placeholder="Search tasks by title..."
        placeholderTextColor="#999" 
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchBar}
        inputStyle={styles.input}
        iconColor="#999"
      />
      {/* Header section*/}
      <View style={styles.header}>
        <Text variant="titleLarge">Task List</Text>
        {/* Navigate to add task screen */}
        <Link href={"/add"} asChild>
          <Button mode="contained">New</Button>
        </Link>
      </View>

      {/* List of tasks */}
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false} // Hide default scroll bar
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/task/${item.id}`)} // navigate to detail/edit
          >
            <Card style={styles.card} mode="elevated">
              <Card.Content style={styles.cardContent}>
                <Checkbox
                  status={item.status === "completed" ? "checked" : "unchecked"}
                  // Enable check
                  onPress={() => toggleTaskStatus(item.id)}
                />
                {/* Task title and description */}
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description} numberOfLines={1}>
                    {item.description}
                  </Text>
                </View>
                {/* Edit and delete icons */}
                <View style={styles.actions}>
                  <IconButton icon="delete" onPress={() => deleteTask(item.id)} />
                </View>
              </Card.Content>
            </Card>
          </TouchableOpacity>
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
  textContainer: {
    flex: 1,
    flexDirection: "column",
  },
  title: {
    flex: 1,
    fontSize: 16,
  },
  description: {
    color: "#666",
    fontSize: 14,
    marginTop: 4,
  },
  actions: {
    flexDirection: "row", // Action icons next to each other
  },
  searchBar: {
    backgroundColor: "#f2f3f4", 
    borderRadius: 24,
    marginBottom: 35,
    elevation: 0,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 8,
    height: 40,
    justifyContent: "center", 
  },
  input: {
    fontSize: 15,
    color: "#444",
    paddingVertical: 0,
    alignSelf: "center", 
  },
});
