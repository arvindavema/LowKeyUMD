import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedScreen from './HomeTabs/FeedStack/FeedScreen.js';
import InboxScreen from './HomeTabs/InboxScreen.js';
import NotificationsScreen from './HomeTabs/NotificationsScreen.js';
import CreateScreen from './HomeTabs/FeedStack/CreateScreen.js';
import 'firebase/auth';

import PostScreen from './HomeTabs/FeedStack/PostScreen.js';
import { SuperIcon } from './HomeTabs/CommonComponents.js';
import { Button } from 'react-native-paper';
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const FeedStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function FeedStackScreen(){
	return(
		<FeedStack.Navigator screenOptions={{headerShown: false,}}>
			<FeedStack.Screen name="Main" component={FeedScreen} />
			<FeedStack.Screen name="Post" component={PostScreen} />
			<FeedStack.Screen name="Create" component={CreateScreen} />
		</FeedStack.Navigator>
	)
}
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
				tabBarShowLabel: true,
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
			<Tab.Screen name="Feed" component={FeedStackScreen} options={ops} />
			<Tab.Screen name="Inbox" component={InboxScreen} options={ops} />
			<Tab.Screen
				name="Notifications"
				component={NotificationsScreen}
				options={ops}
			/>
		</Tab.Navigator>
	);
}
