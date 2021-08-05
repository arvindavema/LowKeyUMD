import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ProfileScreen from './ProfileScreen.js';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CategoriesScreen from './CategoriesScreen.js';
import LoginScreen from './LoginScreen.js';
const Drawer = createDrawerNavigator();

export default function HomeScreen({ navigation }) {
	return (
		<Drawer.Navigator>
			<Drawer.Screen name="Profile" component={ProfileScreen} />
			<Drawer.Screen name="Categories" component={CategoriesScreen} />
			<Drawer.Screen name="Login" component={LoginScreen} />
		</Drawer.Navigator>
	);
}
