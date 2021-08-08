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

const DATA = [
	{
		id: 1,
		title: 'Textbooks',
		text: 'Buy, sell, or trade textbooks.',
	},
	{
		id: 2,
		title: 'Electronics',
		text: 'Computers, laptops, smartphones, gadgets and whatnot',
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
		<Card
			mode="elevated"
			elevation={5}
			style={{ flex: 1, margin: 10, padding: 2, borderRadius: 10 }}
		>
			<Card.Content>
				<Title>{item.title}</Title>
				<Paragraph>{item.text}</Paragraph>
			</Card.Content>
		</Card>
	);
};

export default function CategoriesScreen({ navigation }) {
	return (
		<SafeAreaView style={{ flex: 1, padding: 2 }}>
			<FlatList
				data={DATA}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
			/>
		</SafeAreaView>
	);
}
