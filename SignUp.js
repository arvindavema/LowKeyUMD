import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

import { Button, TextInput } from 'react-native-paper';
function Signup({ navigation }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const terpmail = '@terpmail.umd.edu';
	const umdmail = '@umd.edu';

	const firebaseSignUp = () => {
		if (email != '' && password != '') {
			if (
				email.substr(email.length - 17) == terpmail ||
				email.substr(email.length - 8) == umdmail
			) {
			} else {
			}
		}
	};

	return (
		<View style={styles.container}>
			<TextInput
				value={email}
				onChangeText={(text) => setEmail(text)}
				placeholder="Email"
				style={styles.inputBox}
			/>
			<TextInput
				value={password}
				onChangeText={(text) => setPassword(text)}
				placeholder="Password"
				secureTextEntry={true}
				style={styles.inputBox}
			/>

			<Button
				title="Sign Up"
				onPress={firebaseSignUp}
				mode="contained"
				style={styles.button}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 10,
	},
	inputBox: {
		width: '100%',
		margin: 5,
		padding: 15,
		fontSize: 16,
		textAlign: 'center',
	},
	button: {
		marginTop: 30,
		marginBottom: 20,
		paddingVertical: 5,
		alignItems: 'center',
		borderWidth: 1,
		borderRadius: 5,
		width: 200,
	},
	buttonText: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	buttonSignup: {
		fontSize: 12,
	},
});

export default Signup;
