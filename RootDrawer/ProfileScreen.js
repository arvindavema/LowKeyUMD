import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';

export default function ProfileScreen({ navigation }) {
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

	return (initializing) ? null : (<View style={{flex: 1,padding: 2,}}>
		<Text>{user.displayName}</Text>
		<Text> Verified: {user.emailVerified.toString()} </Text>
		</View>);
}
