import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import Styles from './ConstantStyles.js';
import {
	DefaultTheme as PaperDefaultTheme,
	Provider as PaperProvider,
} from 'react-native-paper';
import firebaseConfig from './FirebaseConfig.js';
import firebase from 'firebase';
import {
	NavigationContainer,
	DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen.js';
import LoginScreen from './LoginScreen.js';
import Signup from './SignUp.js';
import LoadingScreen from './LoadingScreen.js';
import 'firebase/auth';
import { Alert } from 'react-native';
if (firebase.apps.length === 0) {
	firebase.initializeApp(firebaseConfig);
	console.log('Connected with Firebase');
}

const CombinedDefaultTheme = {
	...PaperDefaultTheme,
	...NavigationDefaultTheme,
	roundness: 2,
	colors: {
		...PaperDefaultTheme.colors,
		...NavigationDefaultTheme.colors,
		primary: '#dd2c00',
		accent: '#455a64',
	},
};

const Stack = createStackNavigator();

export default function App() {
	return (
		<PaperProvider theme={CombinedDefaultTheme}>
			<NavigationContainer theme={CombinedDefaultTheme}>
				<Stack.Navigator>
					<Stack.Screen
						name="Home"
						component={HomeScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Loading"
						component={LoadingScreen}
						options={{ headerShown: false }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</PaperProvider>
	);
}
