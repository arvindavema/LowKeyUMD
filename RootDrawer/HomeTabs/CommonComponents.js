import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

export function SuperIcon({ name, focused, color, size }) {
	let n;
	if (name === 'Feed') {
		n = focused ? 'time-outline' : 'time';
	} else if (name === 'Find Stuff') {
		n = focused ? 'grid-outline' : 'grid-sharp';
	} else if (name === 'New Post') {
		n = focused ? 'ios-create-outline' : 'ios-create-sharp';
	} else if (name === 'Inbox') {
		n = focused ? 'chatbubbles-outline' : 'chatbubbles-sharp';
	} else if (name === 'Notifications') {
		n = focused
			? 'ios-notifications-circle-outline'
			: 'ios-notifications-circle-sharp';
	} else if (name === 'New Post') {
		n = focused ? 'american-football-outline' : 'american-football';
	}

	return <Ionicons name={n} color={color} size={size} />;
	// You can return any component that you like here!
}

export const Fab = ({ onTap }) => (
	<FAB
		style={{ position: 'absolute', margin: 16, right: 0, bottom: 0 }}
		small
		icon="plus"
		onPress={onTap}
	/>
);

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',

		margin: 10,
	},
	button: {
		alignItems: 'center',
		borderRadius: 5,
		width: '90%',
		margin: 10,
	},
	inputBox: {
		width: 300,
		margin: 10,
		borderRadius: 5,
	},
	scrollContainer: { paddingHorizontal: 2, paddingVertical: 2 },
});
