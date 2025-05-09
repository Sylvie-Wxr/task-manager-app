import { ScrollView, View, StyleSheet } from "react-native";
import { Text, TextInput, Button, RadioButton } from "react-native-paper";

// Props passed into TaskForm for both Add and Edit screens
type Props = {
  title: string;
  description: string;
  status: "pending" | "completed";
  onChangeTitle: (text: string) => void;
  onChangeDescription: (text: string) => void;
  onChangeStatus: (status: "pending" | "completed") => void;
  onSubmit: () => void;
  onCancel: () => void;
  submitLabel?: string;
};

export default function TaskForm({
  title,
  description,
  status,
  onChangeTitle,
  onChangeDescription,
  onChangeStatus,
  onSubmit,
  onCancel,
  submitLabel = "Save",
}: Props) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
    	{/* Title Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          mode="outlined"
          placeholder="e.g., Grocery Shopping"
          value={title}
          onChangeText={onChangeTitle}
          style={styles.input}
        />
      </View>

			{/* Description Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          mode="outlined"
          placeholder="Details about the task..."
          value={description}
          onChangeText={onChangeDescription}
          multiline
          numberOfLines={6}
          style={styles.textArea}
        />
      </View>

			{/* Status Group */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Status</Text>
        <RadioButton.Group onValueChange={value => onChangeStatus(value as "pending" | "completed")} value={status}>
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

			{/* Submit Button */}
      <Button
        mode="contained"
        onPress={onSubmit}
        buttonColor="#8c7cde"
        disabled={title.trim() === ""} // disabled when title is empty
        style={styles.submitButton}
      >
        {submitLabel}
      </Button>

			{/* Cancel Button */}
      {onCancel && (
        <Button onPress={onCancel} 
        style={{ marginTop: 8 }}>
          Cancel
        </Button>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#fff",
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
  textArea: {
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
  },
});
