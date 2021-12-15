import React from 'react';
import { Button } from 'react-native-paper';
import LoginScreen from './AuthenticateStack/LoginScreen.js';
import Signup from './AuthenticateStack/SignUp.js';
import { createStackNavigator } from '@react-navigation/stack';


const AuthStack = createStackNavigator();

export default function AuthenticateScreen({ navigation }) {
	const ops = {
		headerLeft: () => (
			<Button
				icon="menu"
				onPress={() => {
					navigation.toggleDrawer();
				}}
				title="Info"
			/>
		),
	};
	return (
		<AuthStack.Navigator>
			<AuthStack.Screen name="Login" component={LoginScreen} options={ops} />
			<AuthStack.Screen name="Register" component={Signup} options={ops} />
		</AuthStack.Navigator>
	);
}
