import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FeedScreen from './HomeTabs/FeedStack/FeedScreen.js'
import InboxScreen from './HomeTabs/InboxScreen.js'
import NotificationsScreen from './HomeTabs/NotificationsScreen.js'
import CreateScreen from './HomeTabs/FeedStack/CreateScreen.js'
import 'firebase/auth'
import ExploreScreen from './HomeTabs/ExploreScreen.js'

import PostScreen from './HomeTabs/FeedStack/PostScreen.js'
import { Button } from 'react-native-paper'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SuperIcon } from './HomeTabs/icons/CustomIcons.js'
const FeedStack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function FeedStackScreen() {
	return (
		<FeedStack.Navigator screenOptions={{ headerShown: false }}>
			<FeedStack.Screen name='Main' component={FeedScreen} />
			<FeedStack.Screen name='Post' component={PostScreen} />
			<FeedStack.Screen name='Create' component={CreateScreen} />
		</FeedStack.Navigator>
	)
}
export default function HomeScreen({ navigation }) {
	const ops = {
		headerLeft: () => (
			<Button
				icon={() => (
					<SuperIcon
						name={'openmenu'}
						color={'red'}
						size={24}
						focused={true}
					/>
				)}
				onPress={() => navigation.toggleDrawer()}
				title='Menu'
			/>
		),
	}

	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarShowLabel: true,
				tabBarIcon: ({ focused, color, size }) => (
					<SuperIcon
						name={route.name}
						focused={focused}
						size={size}
						color={color}
					/>
				),
			})}>
			<Tab.Screen name='Feed' component={FeedStackScreen} options={ops} />

			<Tab.Screen
				name='Trending'
				component={ExploreScreen}
				options={ops}
			/>

			<Tab.Screen
				name='Notifications'
				component={NotificationsScreen}
				options={ops}
			/>
			<Tab.Screen
				name='Bookmarks'
				component={InboxScreen}
				options={ops}
			/>
		</Tab.Navigator>
	)
}
