import { Link, useRouter } from "expo-router";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Card, Checkbox, IconButton, Text } from "react-native-paper";
import { useTaskContext } from "@/context/TaskContext";

export default function TaskList() {
  // Access tasks and actions from context
  const { tasks, toggleTaskStatus, deleteTask } = useTaskContext();
  const router = useRouter(); // initialize router

  return (
    <View
      style={styles.container}
    >
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
        data={tasks}
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
                {/* Task title display */}
                <Text style={styles.title}>{item.title}</Text>
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
  title: {
    flex: 1,
    fontSize: 16,
  },
  actions: {
    flexDirection: "row", // Action icons next to each other
  },
});
