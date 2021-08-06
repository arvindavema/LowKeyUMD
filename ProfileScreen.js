import React from 'react';
import {
	View,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Text,
} from 'react-native';
import Styles from './ConstantStyles.js';

import LoginScreen from './LoginScreen.js';
import Signup from './SignUp.js';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
export default function ProfileScreen({ navigation }) {
	return (
		<View style={Styles.container}>
			<Text>Home</Text>
		</View>
	);
}
