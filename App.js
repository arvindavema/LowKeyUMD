import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-native-ui-lib';
import {
	DefaultTheme as PaperDefaultTheme,
	Provider as PaperProvider,
} from 'react-native-paper';
import {
	NavigationContainer,
	DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './RootDrawer/HomeScreen.js';
import AuthenticateScreen from './RootDrawer/AuthenticateScreen.js';
import LoadingScreen from './LoadingScreen.js';
import ProfileScreen from './RootDrawer/ProfileScreen.js';
import SettingsScreen from './RootDrawer/SettingsScreen.js';
import firebaseConfig from './FirebaseConfig.js';
import firebase from 'firebase';

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

const AppRootDrawer = createDrawerNavigator();

export default function App() {
	const [user, setUser] = useState(firebase.auth().currentUser);
	const [initializing, setInitializing] = useState(true);
	const ops = [{headerShown: true,}, {headerShown: false}];
	function authStateChanged(u) {
		setUser(u);
		if (initializing) {
			setInitializing(false);
		}
	}

	useEffect(() => {
		const subscriber = firebase.auth().onAuthStateChanged(authStateChanged);
		return subscriber; // unsubscribe on unmount
	});

	if (initializing) return <LoadingScreen />;

	return (
		<PaperProvider theme={CombinedDefaultTheme}>
			<NavigationContainer theme={CombinedDefaultTheme}>
				{user != null ? (
					<AppRootDrawer.Navigator>
						<AppRootDrawer.Screen
							name="Home"
							component={HomeScreen}
							options={ops[1]}
						/>
					
						<AppRootDrawer.Screen
						name="Profile"
						component={ProfileScreen}
						options={ops[0]}
						/>
						<AppRootDrawer.Screen
						name="Settings"
						component={SettingsScreen}
						options={ops[0]}
						/>
					</AppRootDrawer.Navigator>
				) : (
					<AppRootDrawer.Navigator>
						<AppRootDrawer.Screen
							name="Authenticate"
							component={AuthenticateScreen}
							options={ops[1]}
						/>
					</AppRootDrawer.Navigator>
				)}
			</NavigationContainer>
		</PaperProvider>
	);
}
