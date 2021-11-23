import React, { useState, useEffect } from 'react';
import { View, ScrollView, Keyboard } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { signIn } from './FirebaseMethods.js';
import { styles } from '../HomeTabs/CommonComponents.js';

export default function LoginScreen({ navigation }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<View style={styles.container}>
			<ScrollView
				onBlur={Keyboard.dismiss}
			>
				<TextInput
					mode="outlined"
					value={email}
					onChangeText={(text) => setEmail(text)}
					label="Email"
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

				<Button
					mode="contained"
					onPress={() => signIn(email, password)}
					style={styles.button}
				>
					Sign In!
				</Button>
				<Button
					mode="outline"
					onPress={() => {
						navigation.navigate('Register');
					}}
					style={styles.button}
				>
					Sign Up!
				</Button>
			</ScrollView>
		</View>
	);
}
