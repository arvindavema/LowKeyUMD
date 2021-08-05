import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Styles from './ConstantStyles.js';
import { Provider as PaperProvider } from 'react-native-paper';
import firebaseConfig from './FirebaseConfig.js';
import firebase from 'firebase';
import 'firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen.js';
import LoginScreen from './LoginScreen.js';
import Signup from './SignUp.js';
import LoadingScreen from './LoadingScreen.js';

if (firebase.apps.length === 0) {
	firebase.initializeApp(firebaseConfig);
}

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<PaperProvider>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="Home" component={HomeScreen} />
					<Stack.Screen name="Register" component={Signup} />
					<Stack.Screen name="Login" component={LoginScreen} />
					<Stack.Screen name="Loading" component={LoadingScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</PaperProvider>
	);
}
