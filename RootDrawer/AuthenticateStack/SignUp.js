import React, { useState } from 'react';
import { View, Keyboard, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import {Button,  TextField} from 'react-native-ui-lib'
import {
	registration,
	validateUsername,
	validateTerpmail,
	removeSpaces,
} from './FirebaseMethods.js';
import { styles } from '../HomeTabs/CommonComponents.js';
export default function Signup({ navigation }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');

	const handleSubmit = (u, e, p) => {
		if(validateUsername(u) && validateTerpmail(e)){
			registration(removeSpaces(u), e, p);
		}
	};

	return (
		<View style={styles.container}>
			<ScrollView keyboardDismissMode="on-drag" bounces={true} >
				<TextInput
					mode="outlined"
					value={username}
					onChangeText={(text) => setUsername(text)}
					label="Username"
					style={styles.inputBox}
				/>

				<TextInput
					label="TERPmail"
					mode="outlined"
					value={email}
					onChangeText={(text) => setEmail(text)}
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
					label="Sign Up"
					onPress={() => {
						handleSubmit(username, email, password);
					}}
					backgroundColor="#ff0000"
					style={styles.button}
				/>
				<Button
					style={styles.button}
					label="Sign In"
					outline
					outlineColor="#ff0000"
					onPress={() => {
						navigation.navigate('Login');
					}}
					/>
			</ScrollView>
		</View>
	);
}
