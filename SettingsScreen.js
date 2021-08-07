import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import firebase from 'firebase';
import { logout } from './FirebaseMethods';
function SettingsScreen({ navigation }) {
	return (
		<View>
			<Text>Settings</Text>
		</View>
	);
}

export default SettingsScreen;
