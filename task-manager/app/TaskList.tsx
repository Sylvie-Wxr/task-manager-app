import { useRouter } from "expo-router";
import { FlatList, StyleSheet, TouchableOpacity, View, SafeAreaView, Dimensions } from "react-native";
import { Card, IconButton, Text, Searchbar, FAB } from "react-native-paper";
import { useTaskContext } from "@/context/TaskContext";
import { useState } from "react";

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
    <SafeAreaView style={styles.safe}>
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

            <FlatList
              data={filteredTasks}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingBottom: 96 }}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => router.push(`/task/${item.id}`)}>
                  <Card style={styles.card} mode="elevated">
                    <Card.Content style={styles.cardContent}>
                      <TouchableOpacity
                        onPress={() => toggleTaskStatus(item.id)}
                        style={[
                          styles.checkbox,
                          item.status === "completed" && styles.checkboxCompleted,
                        ]}
                      >
                        {item.status === "completed" && (
                          <Text style={styles.checkmarkCompleted}>✓</Text>
                        )}
                      </TouchableOpacity>

                      <View style={styles.textContainer}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.description} numberOfLines={1}>
                          {item.description}
                        </Text>
                      </View>
                      <View style={styles.actions}>
                        <IconButton icon="delete" onPress={() => deleteTask(item.id)} />
                      </View>
                    </Card.Content>
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
          style={[styles.fab, { width: 72, height: 72 }]}
          onPress={() => router.push("/add")}
          color="white"
        />
      </View>
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
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
  cardContent: {
    flexDirection: "row", // Items (checkbox, title, actions) in a row
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 12,
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
