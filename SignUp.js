import React, { useState, useEffect } from 'react';
import {
	View,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Text,
	Button,
} from 'react-native';

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
				autoCapitalize="none"
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
				style={styles.button}
				onClick={firebaseSignUp}
				style={styles.button}
			/>
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

export default Signup;
