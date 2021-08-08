import React, { useState, useEffect } from 'react';
import { Alert, Platform, View, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function CustomImagePicker() {
	const [image, setImage] = useState(null);

	useEffect(() => {
		(async () => {
			if (Platform.OS !== 'web') {
				const { status } =
					await ImagePicker.requestMediaLibraryPermissionsAsync();
				if (status !== 'granted') {
					Alert.alert('Whoops! Please allow camera roll access for this app.');
				}
			}
		})();
	}, []);

	const pickImage = async () => {
		let result = await Imagepicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
		Alert.alert(result);

		if (!result.cancelled) {
			setImage(result.uri);
		}
	};
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Button title="Pick an image from camera roll" onPress={pickImage} />
			{image && (
				<Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
			)}
		</View>
	);
}
