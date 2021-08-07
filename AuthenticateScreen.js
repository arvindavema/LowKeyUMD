import React from 'react';
import { View, Text } from 'react-native';
import LoginScreen from './LoginScreen.js';
import Signup from './SignUp.js';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './ProfileScreen.js';
import firebase from 'firebase';
const AuthStack = createStackNavigator();

export default function AuthenticateScreen({ navigation }) {
	return (
		<AuthStack.Navigator>
			<AuthStack.Screen
				name="Profile"
				component={ProfileScreen}
				options={{ headerShown: false }}
			/>
			<AuthStack.Screen
				name="Login"
				component={LoginScreen}
				options={{ headerShown: false }}
			/>
			<AuthStack.Screen
				name="Register"
				component={Signup}
				options={{ headerShown: false }}
			/>
		</AuthStack.Navigator>
	);
}
