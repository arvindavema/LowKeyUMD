import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedScreen from './HomeTabs/FeedScreen.js';
import InboxScreen from './HomeTabs/InboxScreen.js';
import SearchScreen from './HomeTabs/SearchScreen.js';
import NotificationsScreen from './HomeTabs/NotificationsScreen.js';
import CreateScreen from './HomeTabs/CreateScreen.js';
import 'firebase/auth';
import { SuperIcon } from './HomeTabs/CommonComponents.js';
import { Button } from 'react-native-paper';

const Tab = createBottomTabNavigator();

export default function HomeScreen({ navigation }) {
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
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarShowLabel: false,
				tabBarIcon: ({ focused, color, size }) => {
					return (
						<SuperIcon
							name={route.name}
							focused={focused}
							size={size}
							color={color}
						/>
					);
				},
			})}
		>
			<Tab.Screen name="Feed" component={FeedScreen} options={ops} />
			
			<Tab.Screen name="New Post" component={CreateScreen} options={ops} />
			<Tab.Screen name="Inbox" component={InboxScreen} options={ops} />
			<Tab.Screen
				name="Notifications"
				component={NotificationsScreen}
				options={ops}
			/>
		</Tab.Navigator>
	);
}
