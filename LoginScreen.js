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
				style={{ marginTop: 5, width: '100%' }}
			/>

			<TextInput
				mode="outlined"
				value={password}
				onChangeText={(text) => setPassword(text)}
				label="Password"
				secureTextEntry={true}
				style={{ width: '100%' }}
			/>

			<Button mode="contained" onPress={firebaseSignIn} style={styles.button}>
				Log In
			</Button>
			<Button
				mode="outline"
				onPress={() => navigation.navigate('Register')}
				style={styles.button}
			>
				Sign Up!
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		paddingHorizontal: 10,
	},
	button: {
		alignItems: 'center',
		borderRadius: 5,
		width: '85%',
		margin: 10,
	},
});

export default LoginScreen;
