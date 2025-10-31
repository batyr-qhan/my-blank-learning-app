import { useState } from "react";
import {
	Image,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Modal from "./components/Modal";

const InnerApp = () => {
	const insets = useSafeAreaInsets();

	const [notes, setNotes] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [inputValue, setInputValue] = useState("");

	const [image, setImage] = useState(null);

	const handleSubmit = () => {
		if (!inputValue.trim()) {
			setModalVisible(!modalVisible);
			return;
		}

		const note = {
			id: `${Math.random()}${Date.now()}`,
			title: inputValue,
			image,
		};

		setNotes((prev) => [...prev, note]);
		setInputValue("");
		setImage(null);
		setModalVisible(!modalVisible);
	};

	return (
		<>
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
						return (
							<View key={el.id} style={styles.noteItemContainer}>
								<Text style={styles.noteItemContainerText}>{el.title}</Text>
								{el.image && (
									<Image source={{ uri: el.image }} style={styles.itemImage} />
								)}
							</View>
						);
					})}
				</View>
				<TouchableOpacity
					style={styles.button}
					onPress={() => {
						setModalVisible(!modalVisible);
					}}
				>
					<Text style={styles.text}>Create Note</Text>
				</TouchableOpacity>
			</View>
			<Modal
				visible={modalVisible}
				onClose={() => setModalVisible(false)}
				handleSubmit={handleSubmit}
				setInputValue={setInputValue}
				inputValue={inputValue}
				setImage={setImage}
				image={image}
			/>
		</>
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
		fontFamily: "Jost",
	},
	button: {
		backgroundColor: "#007BFF",
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderRadius: 8,
		alignItems: "center",
		fontFamily: "Jost",
	},
	text: {
		color: "#fff",
		fontSize: 24,
		fontWeight: "500",
		fontFamily: Platform.OS === "ios" ? "Jost" : "Roboto",
	},
	notesContainer: {
		flex: 1,
		backgroundColor: "#f0f0f0",
		borderRadius: 8,
		padding: 16,
	},
	noteItemContainer: {
		marginBottom: 8,
		backgroundColor: "#fff",
		padding: 16,
		borderRadius: 4,
	},

	noteItemContainerText: {
		fontSize: 20,
		fontFamily: "Jost",
	},
	itemImage: {
		width: 90,
		height: 90,
	},
});
