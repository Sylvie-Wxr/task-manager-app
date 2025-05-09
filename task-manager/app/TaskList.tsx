import { useRouter } from "expo-router";
import { FlatList, StyleSheet, TouchableOpacity, View, SafeAreaView, Dimensions } from "react-native";
import { Card, IconButton, Text, Searchbar, FAB } from "react-native-paper";
import { useTaskContext } from "@/context/TaskContext";
import { useState } from "react";

// Get screen height for calculating dynamic padding
const screenHeight = Dimensions.get("window").height;

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
    <View style={styles.container}>
      {/* Search bar (always visible) */}
      <Searchbar
        placeholder="Search tasks by title..."
        placeholderTextColor="#999"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchBar}
        inputStyle={styles.input}
        iconColor="#999"
      />

      {/* No task, suggesting creating one */}
      {filteredTasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <IconButton
            icon="clipboard-plus-outline"
            size={64}
            iconColor="#ccc"
            style={styles.emptyIcon}
          />
          <Text style={styles.emptyText}>
            You have no tasks right now. Tap the + to create one!
          </Text>
        </View>
      ) : (
        <>

          {/* List of filtered task cards */}
          <FlatList
            data={filteredTasks}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 96 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => router.push(`/task/${item.id}`)}>
                <Card style={styles.card} mode="elevated">
                  <Card.Title
                    title={item.title} // Task title
                    subtitle={item.description} // Task description (1 line)
                    titleStyle={styles.title}
                    subtitleStyle={styles.description}
                    style={{ paddingVertical: 12 }}
                    left={() => (
                      // Checkbox on the left
                      <TouchableOpacity
                        onPress={() => toggleTaskStatus(item.id)}
                        style={[
                          styles.checkbox,
                          item.status === "completed" && styles.checkboxCompleted,
                        ]}
                      >
                         {/* Show checkmark if task is completed */}
                        {item.status === "completed" && (
                          <Text style={styles.checkmarkCompleted}>✓</Text>
                        )}
                      </TouchableOpacity>
                    )}
                    // Delete icon on the right
                    right={() => (
                      <IconButton
                        icon="delete"
                        onPress={() => deleteTask(item.id)}
                        style={{ marginRight: 4 }}
                      />
                    )}
                  />
                </Card>

              </TouchableOpacity>
            )}
          />
        </>
      )}

      {/* Floating Add Button */}
      <FAB
        icon="plus"
        size="large"
        style={[styles.fab, { width: 65, height: 65 }]}
        onPress={() => router.push("/add")} // Navigate to add task screen
        color="white"
      />
    </View>
  );

}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: screenHeight * 0.2,
  },
  emptyIcon: {
    marginBottom: 12,
  },

  emptyText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  card: {
    marginBottom: 25,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 19,
  },

  description: {
    color: "#666",
    fontSize: 14,
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
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    backgroundColor: '#826bff',
    elevation: 4, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    borderRadius: 36, // Make it a circle
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1.5,
    borderColor: "#555",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  checkboxCompleted: {
    backgroundColor: "#7d7cde",
    borderColor: "#7d7cde",
  },

  checkmarkCompleted: {
    fontSize: 14,
    color: "#ffffff",
    fontWeight: "bold",
    lineHeight: 16,
  },
});
