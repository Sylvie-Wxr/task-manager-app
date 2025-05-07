import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { useRouter } from "expo-router";
import { Task } from "../types/task";

export default function AddTaskScreen() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
      const router = useRouter();
  
      return (
      <View style={styles.container}>
        <Text variant="titleLarge" style={styles.header}>New Task</Text>
  
        <TextInput
          label="Title"
          value={title}
          onChangeText={setTitle}
          mode="outlined"
          style={styles.input}
        />
  
        <TextInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          mode="outlined"
          multiline
          numberOfLines={3}
          style={styles.input}
        />
  
        <Button
          mode="contained"
          onPress={() => {}}
          disabled={title.trim() === ""}
        >
          Save
        </Button>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      padding: 16,
      flex: 1,
      backgroundColor: "#fff",
    },
    header: {
      marginBottom: 16,
    },
    input: {
      marginBottom: 16,
    },
  });