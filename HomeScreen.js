import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ProfileScreen from './ProfileScreen.js';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CategoriesScreen from './CategoriesScreen.js';
import LoginScreen from './LoginScreen.js';
import BrowseScreen from './BrowseScreen.js';
import firebase from 'firebase';
import 'firebase/auth';

const Drawer = createDrawerNavigator();

export default function HomeScreen({ navigation }) {
	const isSignedIn = firebase.auth().currentUser != null;
	return isSignedIn ? (
		<Drawer.Navigator>
			<Drawer.Screen name="Browse" component={BrowseScreen} />
			<Drawer.Screen name="Categories" component={CategoriesScreen} />
			<Drawer.Screen name="Profile" component={ProfileScreen} />
		</Drawer.Navigator>
	) : (
		<Drawer.Navigator>
			<Drawer.Screen name="Browse" component={BrowseScreen} />
			<Drawer.Screen name="Categories" component={CategoriesScreen} />
			<Drawer.Screen name="Login" component={LoginScreen} />
		</Drawer.Navigator>
	);
}
