import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import Styles from './ConstantStyles.js';
import { logout } from './FirebaseMethods';
import { Button } from 'react-native-paper';
import firebase from 'firebase';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
export default function ProfileScreen({ navigation }) {
	const [text, setText] = React.useState('');
	const hasUnsavedChanges = Boolean(text);
	useEffect(
		() =>
			navigation.addListener('beforeRemove', (e) => {
				if (firebase.auth().currentUser != null) {
					// If we don't have unsaved changes, then we don't need to do anything
					// Prevent default behavior of leaving the screen
					e.preventDefault();
				} else {
					// Prompt the user before leaving the screen
					navigation.dispatch(e.data.action);
				}
			}),
		[navigation, hasUnsavedChanges]
	);

	if (firebase.auth().currentUser != null) {
		return (
			<View style={Styles.container}>
				<Text>ProFile</Text>
				<Button
					mode="contained"
					onPress={() => {
						firebase
							.auth()
							.signOut()
							.then(() => {
								navigation.navigate('Login');
							})
							.catch((error) => {
								Alert.alert(error.message);
							});
					}}
				>
					Sign Out
				</Button>
			</View>
		);
	} else {
		return (
			<View style={Styles.container}>
				<Button
					mode="contained"
					onPress={() => {
						navigation.navigate('Login');
					}}
				>
					Sign In
				</Button>
			</View>
		);
	}
}
