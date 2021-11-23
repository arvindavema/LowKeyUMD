import React, { useState, useEffect } from 'react';
import { View, ScrollView, Keyboard } from 'react-native';
import { TextInput } from 'react-native-paper';
import { signIn } from './FirebaseMethods.js';
import { styles } from '../HomeTabs/CommonComponents.js';
import { Button } from 'react-native-ui-lib';

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
					backgroundColor="#ff0000"
					label="Sign In!"
					onPress={() => signIn(email, password)}
					style={styles.button}
				/>
					
				<Button
					outline
					outlineColor="#ff0000"
					label="Sign Up!"
					onPress={() => {
						navigation.navigate('Register');
					}}
					style={styles.button}
					/>
			</ScrollView>
		</View>
	);
}
