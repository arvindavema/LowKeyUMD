import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import SettingsScreen from './SettingsScreen.js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CategoriesScreen from './CategoriesScreen.js';
import BrowseScreen from './BrowseScreen.js';
import firebase from 'firebase';
import 'firebase/auth';
import AuthenticateScreen from './AuthenticateScreen.js';

const Tab = createBottomTabNavigator();

export default function HomeScreen({ navigation }) {
	return (
		<Tab.Navigator>
			<Tab.Screen name="Feed" component={BrowseScreen} />
			<Tab.Screen
				name="Categories"
				component={CategoriesScreen}
				options={{ headerShown: false }}
			/>
			<Tab.Screen name="Inbox" component={SettingsScreen} />
			<Tab.Screen
				name="Account"
				component={AuthenticateScreen}
				options={{ headerShown: false }}
			/>
		</Tab.Navigator>
	);
}
