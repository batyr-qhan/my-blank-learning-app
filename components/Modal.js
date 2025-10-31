import * as ImagePicker from "expo-image-picker";
import {
	Button,
	Dimensions,
	Pressable,
	Modal as RnModal,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";

const Modal = ({
	visible,
	onClose,
	handleSubmit,
	setInputValue,
	inputValue,
	setImage,
	image,
    children,
}) => {
	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images", "videos"],
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		console.log(result);

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	return (
		<RnModal
			animationType="slide"
			transparent={true}
			visible={visible}
			onRequestClose={() => {
				onClose();
			}}
		>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<Text style={styles.modalText}>Hello World!</Text>
					<View
						style={{
							width: "80%",
						}}
					>
						<TextInput
							style={styles.textInput}
							placeholder="Type your note here"
							value={inputValue}
							onChangeText={(txt) => {
								setInputValue(txt);
							}}
						/>
					</View>
					<Button title="Pick an image from camera roll" onPress={pickImage} />
					{image && <Image source={{ uri: image }} style={styles.image} />}
					<Pressable
						style={[styles.buttonModal, styles.buttonClose]}
						onPress={handleSubmit}
						// disabled={!inputValue.trim()}
					>
						<Text style={styles.textStyle}>Submit</Text>
					</Pressable>
				</View>
			</View>
		</RnModal>
	);
};

export default Modal;

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	modalView: {
		marginHorizontal: 20,
		// maxWidth: 400,
		width: Dimensions.get("window").width - 60,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	buttonModal: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
		paddingHorizontal: 20,
	},
	buttonOpen: {
		backgroundColor: "#F194FF",
	},
	buttonClose: {
		backgroundColor: "#2196F3",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
	},
	textInput: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		paddingHorizontal: 16,
		borderRadius: 8,
		marginBottom: 16,
	},
	image: {
		width: 200,
		height: 200,
	},
});
