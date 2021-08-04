import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './Screens/Login.js';

import Firebase from './FirebaseConfig';
import 'firebase/auth';
import 'firebase/database';

function HomeScreen({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Button
				title="Settings"
				onPress={() => navigation.navigate('Settings')}
				Home
			/>
		</View>
	);
}

function SettingsScreen({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Button title="Home" onPress={() => navigation.navigate('Home')} />
		</View>
	);
}

const Stack = createNativeStackNavigator();

export default class App extends React.Component {
	render() {
		return <Login />;
	}
	// <NavigationContainer>
	// 	<Stack.Navigator>
	// 		<Stack.Screen name="Home" component={HomeScreen} />
	// 		<Stack.Screen name="Settings" component={SettingsScreen} />
	// 	</Stack.Navigator>
	// </NavigationContainer
}
