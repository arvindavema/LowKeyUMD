import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import Styles from './ConstantStyles.js';
import { logout } from './AuthenticateStack/FirebaseMethods';
import { Button } from 'react-native-paper';
import firebase from 'firebase';
import { createStackNavigator } from '@react-navigation/stack';

const ProfileStack = createStackNavigator();

export default function MyProfileScreen({ navigation }) {
	const [initializing, setInitializing] = useState(true);
	const [user, setUser] = useState();

	// Handle user state changes
	function onAuthStateChanged(user) {
		setUser(user);
		if (initializing) setInitializing(false);
	}

	useEffect(() => {
		const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber; // unsubscribe on unmount
	}, [navigation]);

	if (initializing) return null;

	if (user) {
		return (
			<View style={Styles.container}>
				<Text>Profile</Text>
				<Button
					mode="contained"
					onPress={() => {
						firebase
							.auth()
							.signOut()
							.then(() => {
								Alert.alert('Logged out');
								console.log('Logged out');
								navigation.navigate('Login');
							})
							.catch((error) => {
								Alert.alert(error.message);
								console.log(error.message);
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
