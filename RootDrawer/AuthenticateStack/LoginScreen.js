import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'
import { TextInput } from 'react-native-paper'
import { pseudoSignIn, signIn } from './FirebaseMethods.js'
import { styles } from '../UsefulComponents.js'
import { Button } from 'react-native-ui-lib'

import firebase from 'firebase'
import 'firebase/firestore'

const auth = () => firebase.auth()
const db = () => firebase.firestore()

export default function LoginScreen({ navigation }) {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	return (
		<View style={styles.container}>
			<ScrollView keyboardDismissMode='on-drag' bounces={true}>
				<TextInput
					mode='outlined'
					value={email}
					onChangeText={(text) => setEmail(text)}
					label='Username or TERPmail'
					style={styles.inputBox}
				/>
				<TextInput
					mode='outlined'
					value={password}
					onChangeText={(text) => setPassword(text)}
					label='Password'
					secureTextEntry={true}
					style={styles.inputBox}
				/>

				<Button
					backgroundColor='#ff0000'
					label='Sign In!'
					onPress={() => signIn(email, password)}
					style={styles.button}
				/>

				<Button
					outline
					outlineColor='#ff0000'
					label='Sign Up!'
					onPress={() => {
						navigation.navigate('Register')
					}}
					style={styles.button}
				/>
			</ScrollView>
		</View>
	)
}
