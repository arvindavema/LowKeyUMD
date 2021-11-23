import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CategoriesScreen from './SearchTabs/CategoriesScreen.js';
import ResultListScreen from './SearchTabs/ResultListScreen.js';
import TextbooksScreen from './SearchTabs/TextbooksScreen.js';
import {Button} from 'react-native-paper'

const SearchStack = createStackNavigator();

export default function SearchScreen({ navigation }) {
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
		<SearchStack.Navigator>
			<SearchStack.Screen
				name={'Find Stuff'}
				component={CategoriesScreen}
				options={ops}
			/>
			<SearchStack.Screen
				name={'Results'}
				component={ResultListScreen}
				options={{ headerShown: false }}
			/>
			<SearchStack.Screen
				name={'Textbooks'}
				component={TextbooksScreen}
				options={{ headerShown: false }}
			/>
		</SearchStack.Navigator>
	);
}
