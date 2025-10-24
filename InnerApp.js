import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const InnerApp = () => {
  const insets = useSafeAreaInsets();

  const [notes, setNotes] = useState([]);

  return (
    <View
      style={{
        ...{
          ...styles.container,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      }}
    >
      <Text style={styles.pageTitle}>Notes List</Text>
      <View style={styles.notesContainer}>
        {notes.map((el) => {
          return <Text>{el}</Text>;
        })}
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Create Note</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InnerApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    gap: 16,
  },
  pageTitle: {
    fontSize: 40,
    fontWeight: "semibold",
  },
  button: {
    backgroundColor: "#007BFF", // blue color
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "600",
  },
  notesContainer: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
});
