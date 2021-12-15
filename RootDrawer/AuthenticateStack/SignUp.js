import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import {Button} from 'react-native-ui-lib'
import {
	registration,
	validateUsername,
	validateTerpmail,
	removeSpaces,
	validatePassword,

} from './FirebaseMethods.js';
import { styles } from '../HomeTabs/CommonComponents.js';
import { ErrorAlert} from '../UsefulComponents.js'

export default function Signup({ navigation }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');

	const handleSubmit = () => {
		var errors=[]

		const spaces= (i)=>{(/\s+/.test(i))}
		const notEmpty = (i)=>{ (i != null && i.length > 0 )}


		if(validateUsername(username) && validateTerpmail(email) && validatePassword(password)){
			registration(username, email, password)
		}else{
			if(!notEmpty(email)){
				errors.push("- Email is required")
				setEmail("")
			}
			if(spaces(email)){
				errors.push("- Email cannot contain spaces")
				setEmail("")


			}
			if(!(email.split('@')[1] == "@terpmail.umd.edu" ) ){
				errors.push("- Email must be a valid UMD TERPemail ending in @terpmail.umd.edu")
				setEmail("")
			}
			if(/\W+/g.test(username)){
				errors.push("- Username can only contain alphanumeric characters (a-z,A-Z,0-9, and _)")
				setUsername("")
			}
			
			if(!notEmpty(username)){
				errors.push("- Username is required")
				setUsername("")
			}
			
			if(!notEmpty(password)){
				errors.push("- Password is required")
				setPassword("")
			}
			if(/\W+/g.test(password)){
				errors.push("- Password can only contain alphanumeric characters (a-z A-Z, 0-9, and _).")
				setPassword("")
			}

			var errorsString = errors.join("\n")

			ErrorAlert("Sign Up failed:\n", errorsString)
		}
	};

	return (
		<View style={styles.container}>
			<ScrollView keyboardDismissMode="on-drag" bounces={true} >
				<TextInput
					mode="outlined"
					value={username}
					onChangeText={ 	setUsername		}
					label="Username"
					style={styles.inputBox}
				/>

				<TextInput
					label="TERPmail"
					mode="outlined"
					value={email}
					onChangeText={setEmail}
					style={styles.inputBox}
				/>
				<TextInput
					mode="outlined"
					value={password}
					onChangeText={ setPassword	}
					label="Password"
					secureTextEntry={true}
					style={styles.inputBox}
				/>

				<Button
					label="Sign Up"
					onPress={handleSubmit}
					backgroundColor="#ff0000"
					style={styles.button}
				/>
				<Button
					style={styles.button}
					label="Sign In"
					outline
					outlineColor="#ff0000"
					onPress={() => 	navigation.navigate('Login')}
					/>
			</ScrollView>
		</View>
	);
}
