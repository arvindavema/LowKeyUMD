import React, { useState } from 'react';
import {
	SafeAreaView,
	View,
	FlatList,
	StyleSheet,
	Text,
	StatusBar,
} from 'react-native';
import {  Card, Title, Paragraph } from 'react-native-paper';

const DATA = [
	{
		id: 1,
		title: 'Textbooks',
		text: 'Buy, sell, or trade textbooks.',
	},
	{
		id: 2,
		title: 'Housing',
		text: 'Find houses and apartments near campus',
	},
	{
		id: 3,
		title: 'Furniture',
		text: 'Sell, buy, or trade sofas, mattresses, coffee tables etc...',
	},
	{
		id: 4,
		title: 'Vehicles',
		text: 'Buy, sell, or trade your wheels. Find bikes, cars, trucks... anything with wheels',
	},
	{
		id: 5,
		title: 'Sneakers',
		text: 'This one is for all you sneaker fiends. Find Terps nearby that want to make a sneaker exchange. ',
	},
];

export default function CategoriesScreen({ navigation }) {
	const renderItem = ({ item }) => {
		return (
			<Card
				mode="elevated"
				elevation={5}
				style={{ flex: 1, margin: 10, padding: 2, borderRadius: 10 }}
				onPress={() => {
					if (item.id == 1) {
						navigation.navigate('Textbooks');
					} else {
						navigation.navigate('Results', { type: item.title });
					}
				}}
			>
				<Card.Content>
					<Title>{item.title}</Title>
					<Paragraph>{item.text}</Paragraph>
				</Card.Content>
			</Card>
		);
	};

	return (
		<SafeAreaView style={{ flex: 1, paddingHorizontal: 2, paddingVertical: 2 }}>
			<FlatList
				data={DATA}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
			/>
		</SafeAreaView>
	);
}
