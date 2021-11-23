import React, { useState } from 'react';
import { View, Keyboard, ScrollView } from 'react-native';
import { Button, TextInput , Text} from 'react-native-paper';
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
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');

	const handleSubmit = (u, f, l, e, p) => {
		if(validateUsername(u) && validateTerpmail(e.split("@"))){
			registration(removeSpaces(u), removeSpaces(f), removeSpaces(l), e, p);
		} 
	
	};

	return (
		<View style={styles.container}>
			<ScrollView onBlur={Keyboard.dismiss}>
				<TextInput
					mode="outlined"
					value={username}
					onChangeText={(text) => setUsername(text)}
					placeholder="Username"
					style={styles.inputBox}
				/>

				<TextInput
					mode="outlined"
					value={firstname}
					onChangeText={(text) => setFirstname(text)}
					placeholder="First Name"
					style={styles.inputBox}
				/>

				<TextInput
					mode="outlined"
					value={lastname}
					onChangeText={(text) => setLastname(text)}
					placeholder="Last Name"
					style={styles.inputBox}
				/>

				<TextInput
					mode="outlined"
					value={email}
					onChangeText={(text) => setEmail(text)}
					placeholder="TERPmail"
					style={styles.inputBox}
				/>
				<TextInput
					mode="outlined"
					value={password}
					onChangeText={(text) => setPassword(text)}
					placeholder="Password"
					secureTextEntry={true}
					style={styles.inputBox}
				/>

				<Button
					title="Sign Up"
					onPress={() => {
						handleSubmit(username, firstname, lastname, email, password);
					}}
					mode="contained"
					style={styles.button}
				>
					Sign Up!
				</Button>
				<Text>Already have an account?</Text>
				<Button
					style={styles.button}
					title="Sign In"
					onPress={() => {
						navigation.navigate('Login');
					}}
				>
					Sign In
				</Button>
			</ScrollView>
		</View>
	);
}
