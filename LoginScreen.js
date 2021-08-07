import React, { useState } from 'react';
import {
	View,
	StyleSheet,
	ScrollView,
	Keyboard,
	SafeAreaView,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { signIn } from './FirebaseMethods.js';
function LoginScreen({ navigation }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<View style={styles.container}>
			<ScrollView
				onBlur={Keyboard.dismiss}
				style={{
					width: '100%',
					height: '100%',
					margin: 5,
					paddingHorizontal: 10,
				}}
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
					title="sign in"
					mode="contained"
					onPress={() => signIn(email, password, navigation)}
					style={styles.button}
				>
					Sign In!
				</Button>
				<Button
					mode="outline"
					onPress={() => {
						navigation.navigate('Register');
					}}
					title="sign up"
					style={styles.button}
				>
					Sign Up!
				</Button>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',

		margin: 10,
	},
	button: {
		alignItems: 'center',
		borderRadius: 5,
		width: '90%',
		margin: 10,
	},
	inputBox: {
		width: 300,
		margin: 10,
		borderRadius: 5,
	},
});

export default LoginScreen;
