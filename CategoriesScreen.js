import React, { useState } from 'react';
import {
	SafeAreaView,
	View,
	FlatList,
	StyleSheet,
	Text,
	StatusBar,
} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const Categories = [
	{
		id: 1,
		title: 'Housing',
	},
	{
		id: 2,
		title: 'Electronics',
	},
	{
		id: 3,
		title: 'Textbooks',
	},
	{
		id: 4,
		title: 'Clothing',
	},
	{
		id: 5,
		title: 'Appliances',
	},
	{
		id: 6,
		title: 'Kicks',
	},
];

const renderItem = ({ item }) => {
	return (
		<Card mode="elevated" style={{ flex: 1, margin: 5, padding: 2 }}>
			<Card.Content>
				<Title>{item.title}</Title>
			</Card.Content>
			<Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
		</Card>
	);
};

export default function CategoriesScreen({ navigation }) {
	return (
		<SafeAreaView style={{ flex: 1, padding: 2 }}>
			<FlatList
				data={Categories}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				numColumns={2}
			/>
		</SafeAreaView>
	);
}
