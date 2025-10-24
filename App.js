import {
  Platform,
  SafeAreaViewComponent,
  StatusBar,
  Text,
  View,
} from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import InnerApp from "./InnerApp";

const App = () => {

  return (
    <SafeAreaProvider>
      <InnerApp />
    </SafeAreaProvider>
  );
};

export default App;

// import React from "react";
// import {
//   StyleSheet,
//   Text,
//   ScrollView,
//   StatusBar,
//   TouchableOpacity,
//   TextInput,
//   Modal,
//   View,
//   Animated,
//   Dimensions,
// } from "react-native";
// import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
// import {
//   PanGestureHandler,
//   State,
//   GestureHandlerRootView,
// } from "react-native-gesture-handler";

// const { width: screenWidth } = Dimensions.get("window");

// const SwipeableNoteItem = ({ note, index, onToggleComplete, onDelete }) => {
//   const translateX = React.useRef(new Animated.Value(0)).current;

//   const onGestureEvent = Animated.event(
//     [{ nativeEvent: { translationX: translateX } }],
//     { useNativeDriver: true }
//   );

//   const onHandlerStateChange = (event) => {
//     if (event.nativeEvent.oldState === State.ACTIVE) {
//       const { translationX } = event.nativeEvent;

//       if (translationX < -100) {
//         // Swipe left - reveal delete button
//         Animated.spring(translateX, {
//           toValue: -80,
//           useNativeDriver: true,
//         }).start();
//       } else if (translationX > 100 && note.type === "todo") {
//         // Swipe right - mark as complete (for todos only)
//         onToggleComplete();
//         Animated.spring(translateX, {
//           toValue: 0,
//           useNativeDriver: true,
//         }).start();
//       } else {
//         // Return to original position
//         Animated.spring(translateX, {
//           toValue: 0,
//           useNativeDriver: true,
//         }).start();
//       }
//     }
//   };

//   const handleDelete = () => {
//     Animated.timing(translateX, {
//       toValue: -screenWidth,
//       duration: 300,
//       useNativeDriver: true,
//     }).start(() => {
//       onDelete();
//     });
//   };

//   return (
//     <View style={styles.swipeContainer}>
//       {/* Delete button background */}
//       <View style={styles.deleteBackground}>
//         <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
//           <Text style={styles.deleteButtonText}>🗑️</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Main note content */}
//       <PanGestureHandler
//         onGestureEvent={onGestureEvent}
//         onHandlerStateChange={onHandlerStateChange}
//       >
//         <Animated.View
//           style={[
//             styles.noteContainer,
//             {
//               transform: [{ translateX }],
//             },
//           ]}
//         >
//           <View style={styles.noteHeader}>
//             <Text style={styles.noteTypeLabel}>
//               {note.type === "todo" ? "📝 TODO" : "📄 NOTE"}
//             </Text>
//             {note.type === "todo" && (
//               <TouchableOpacity
//                 onPress={onToggleComplete}
//                 style={styles.checkboxContainer}
//               >
//                 <Text style={styles.checkbox}>
//                   {note.completed ? "✅" : "⬜"}
//                 </Text>
//               </TouchableOpacity>
//             )}
//           </View>
//           <Text
//             style={[
//               styles.noteText,
//               note.type === "todo" && note.completed && styles.completedText,
//             ]}
//           >
//             {note.text}
//           </Text>

//           {/* Swipe hint */}
//           <Text style={styles.swipeHint}>
//             {note.type === "todo"
//               ? "← Delete | Complete →"
//               : "← Swipe to delete"}
//           </Text>
//         </Animated.View>
//       </PanGestureHandler>
//     </View>
//   );
// };

// const App = () => {
//   const [notes, setNotes] = React.useState([]);
//   const [inputText, setInputText] = React.useState("");
//   const [modalVisible, setModalVisible] = React.useState(false);
//   const [newNoteText, setNewNoteText] = React.useState("");
//   const [noteType, setNoteType] = React.useState("note"); // "note" or "todo"
//   const [newTodoCompleted, setNewTodoCompleted] = React.useState(false);

//   const handleToggleComplete = (index) => {
//     const updatedNotes = notes.map((n, i) =>
//       i === index ? { ...n, completed: !n.completed } : n
//     );
//     setNotes(updatedNotes);
//   };

//   const handleDeleteNote = (index) => {
//     const updatedNotes = notes.filter((_, i) => i !== index);
//     setNotes(updatedNotes);
//   };

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <SafeAreaProvider>
//         <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
//           <ScrollView style={styles.scrollView}>
//             {notes.map((note, index) => (
//               <SwipeableNoteItem
//                 key={note.id}
//                 note={note}
//                 index={index}
//                 onToggleComplete={() => handleToggleComplete(index)}
//                 onDelete={() => handleDeleteNote(index)}
//               />
//             ))}
//           </ScrollView>
//           <TouchableOpacity
//             style={styles.touchableButton}
//             onPress={() => {
//               setModalVisible(true);
//             }}
//           >
//             <Text style={styles.buttonText}>Create Note</Text>
//           </TouchableOpacity>

//           {/* Modal for creating new notes */}
//           <Modal
//             animationType="slide"
//             transparent={true}
//             visible={modalVisible}
//             onRequestClose={() => setModalVisible(false)}
//           >
//             <View style={styles.modalOverlay}>
//               <View style={styles.modalContent}>
//                 <Text style={styles.modalTitle}>Create New Note</Text>

//                 {/* Note Type Selection */}
//                 <View style={styles.noteTypeContainer}>
//                   <TouchableOpacity
//                     style={[
//                       styles.noteTypeButton,
//                       noteType === "note" && styles.noteTypeSelected,
//                     ]}
//                     onPress={() => setNoteType("note")}
//                   >
//                     <Text
//                       style={[
//                         styles.noteTypeButtonText,
//                         noteType === "note" && styles.noteTypeSelectedText,
//                       ]}
//                     >
//                       📄 Note
//                     </Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     style={[
//                       styles.noteTypeButton,
//                       noteType === "todo" && styles.noteTypeSelected,
//                     ]}
//                     onPress={() => setNoteType("todo")}
//                   >
//                     <Text
//                       style={[
//                         styles.noteTypeButtonText,
//                         noteType === "todo" && styles.noteTypeSelectedText,
//                       ]}
//                     >
//                       📝 Todo
//                     </Text>
//                   </TouchableOpacity>
//                 </View>

//                 {/* Show checkbox for todos */}
//                 {noteType === "todo" && (
//                   <View style={styles.modalCheckboxContainer}>
//                     <TouchableOpacity
//                       onPress={() => {
//                         setNewTodoCompleted(!newTodoCompleted);
//                       }}
//                       style={styles.modalCheckboxButton}
//                     >
//                       <Text style={styles.modalCheckbox}>
//                         {newTodoCompleted ? "✅" : "⬜"}
//                       </Text>
//                       <Text style={styles.modalCheckboxLabel}>
//                         Mark as completed
//                       </Text>
//                     </TouchableOpacity>
//                   </View>
//                 )}

//                 <TextInput
//                   style={styles.modalInput}
//                   placeholder={
//                     noteType === "todo"
//                       ? "Enter your todo..."
//                       : "Enter your note..."
//                   }
//                   value={newNoteText}
//                   onChangeText={setNewNoteText}
//                   multiline={true}
//                   numberOfLines={noteType === "todo" ? 1 : 2}
//                 />

//                 <View style={styles.modalButtons}>
//                   <TouchableOpacity
//                     style={[styles.modalButton, styles.cancelButton]}
//                     onPress={() => {
//                       setModalVisible(false);
//                       setNewNoteText("");
//                       setNoteType("note"); // reset to default
//                       setNewTodoCompleted(false); // reset checkbox
//                     }}
//                   >
//                     <Text style={styles.cancelButtonText}>Cancel</Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     style={[styles.modalButton, styles.saveButton]}
//                     onPress={() => {
//                       if (newNoteText.trim()) {
//                         const newNote = {
//                           text: newNoteText,
//                           type: noteType,
//                           completed:
//                             noteType === "todo" ? newTodoCompleted : false,
//                           id: Date.now(), // simple unique id
//                         };
//                         setNotes([...notes, newNote]);
//                         setNewNoteText("");
//                         setModalVisible(false);
//                         setNoteType("note"); // reset to default
//                         setNewTodoCompleted(false); // reset checkbox
//                       }
//                     }}
//                   >
//                     <Text style={styles.saveButtonText}>Save</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           </Modal>
//         </SafeAreaView>
//       </SafeAreaProvider>
//     </GestureHandlerRootView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: StatusBar.currentHeight,
//   },
//   scrollView: {
//     backgroundColor: "pink",
//     padding: 24,
//   },
//   text: {
//     fontSize: 24,
//     padding: 12,
//   },
//   touchableButton: {
//     backgroundColor: "#007AFF",
//     marginHorizontal: 20,
//     marginVertical: 10,
//     padding: 15,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   buttonText: {
//     fontSize: 24,
//     color: "white",
//     fontWeight: "bold",
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContent: {
//     backgroundColor: "white",
//     margin: 20,
//     borderRadius: 10,
//     padding: 20,
//     width: "90%",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 15,
//     textAlign: "center",
//   },
//   modalInput: {
//     borderColor: "#ddd",
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 10,
//     fontSize: 16,
//     marginBottom: 20,
//     minHeight: 80,
//     textAlignVertical: "top",
//   },
//   modalButtons: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   modalButton: {
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     flex: 0.45,
//   },
//   cancelButton: {
//     backgroundColor: "#f0f0f0",
//   },
//   saveButton: {
//     backgroundColor: "#007AFF",
//   },
//   cancelButtonText: {
//     color: "#333",
//     textAlign: "center",
//     fontWeight: "bold",
//   },
//   saveButtonText: {
//     color: "white",
//     textAlign: "center",
//     fontWeight: "bold",
//   },
//   noteContainer: {
//     backgroundColor: "white",
//     marginBottom: 12,
//     padding: 15,
//     borderRadius: 10,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 3,
//   },
//   noteHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   noteTypeLabel: {
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "#666",
//   },
//   noteText: {
//     fontSize: 16,
//     lineHeight: 22,
//     color: "#333",
//   },
//   completedText: {
//     textDecorationLine: "line-through",
//     color: "#999",
//   },
//   checkboxContainer: {
//     padding: 5,
//   },
//   checkbox: {
//     fontSize: 20,
//   },
//   noteTypeContainer: {
//     flexDirection: "row",
//     marginBottom: 15,
//     borderRadius: 8,
//     overflow: "hidden",
//   },
//   noteTypeButton: {
//     flex: 1,
//     paddingVertical: 12,
//     backgroundColor: "#f0f0f0",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#ddd",
//   },
//   noteTypeSelected: {
//     backgroundColor: "#007AFF",
//   },
//   noteTypeButtonText: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   noteTypeSelectedText: {
//     color: "white",
//   },
//   modalCheckboxContainer: {
//     marginBottom: 15,
//   },
//   modalCheckboxButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 10,
//     backgroundColor: "#f8f8f8",
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#ddd",
//   },
//   modalCheckbox: {
//     fontSize: 20,
//     marginRight: 10,
//   },
//   modalCheckboxLabel: {
//     fontSize: 16,
//     color: "#333",
//   },
//   // Swipe-related styles
//   swipeContainer: {
//     marginBottom: 12,
//     position: "relative",
//   },
//   deleteBackground: {
//     position: "absolute",
//     height: "80%",
//     right: 0,
//     top: 0,
//     bottom: 0,
//     width: 80,
//     backgroundColor: "#ff4444",
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 10,
//   },
//   deleteButton: {
//     width: "100%",
//     height: "100%",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   deleteButtonText: {
//     color: "white",
//     fontSize: 24,
//   },
//   swipeHint: {
//     fontSize: 10,
//     color: "#999",
//     textAlign: "center",
//     marginTop: 5,
//     fontStyle: "italic",
//   },
// });

// export default App;
