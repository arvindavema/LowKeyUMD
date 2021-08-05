import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

function LoginScreen({ navigation }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const firebaseSignIn = () => {
		navigation.goBack();
	};
	return (
		<View style={styles.container}>
			<TextInput
				mode="outlined"
				value={email}
				onChangeText={(text) => setEmail(text)}
				label="Email"
				autoCapitalize="none"
				style={styles.inputBox}
			/>

			<TextInput
				mode="outlined"
				value={password}
				onChangeText={(text) => setPassword(text)}
				label="Password"
				secureTextEntry={true}
				style={styles.inputBox}
			/>

			<Button mode="contained" onPress={firebaseSignIn} style={styles.button}>
				Sign Up
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputBox: {
		width: '85%',
		margin: 10,
		padding: 15,
		fontSize: 16,
		borderColor: '#d3d3d3',
		borderBottomWidth: 1,
		textAlign: 'center',
	},
	button: {
		marginTop: 30,
		marginBottom: 20,
		paddingVertical: 5,
		alignItems: 'center',
		backgroundColor: '#FFA611',
		borderColor: '#FFA611',
		borderWidth: 1,
		borderRadius: 5,
		width: 200,
	},
	buttonText: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#fff',
	},
	buttonSignup: {
		fontSize: 12,
	},
});

export default LoginScreen;
