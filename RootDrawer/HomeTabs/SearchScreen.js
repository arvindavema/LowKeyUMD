import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CategoriesScreen from './SearchTabs/CategoriesScreen.js';
import ResultListScreen from './SearchTabs/ResultListScreen.js';
import TextbooksScreen from './SearchTabs/TextbooksScreen.js';
const SearchStack = createStackNavigator();

export default function SearchScreen({ navigation }) {
	return (
		<SearchStack.Navigator>
			<SearchStack.Screen
				name={'Categories'}
				component={CategoriesScreen}
				options={{ headerShown: false }}
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
