import * as React from 'react'
import { StyleSheet } from 'react-native'
import { FAB } from 'react-native-paper'

export const Fab = ({ onTap }) => (
	<FAB
		style={{ position: 'absolute', margin: 16, right: 0, bottom: 0 }}
		small
		icon='plus'
		onPress={onTap}
	/>
)

export const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		justifyContent: 'center',
		flex: 1,
		alignItems: 'stretch',
		margin: 5,
	},
	button: {
		margin: 10,
	},
	inputBox: {
		margin: 10,
	},
	inputArea: {
		margin: 10,
	},
	scrollContainer: {
		paddingHorizontal: 0,
		paddingVertical: 0,
	},
	fab: {
		position: 'absolute',
		backgroundColor: '#ff0000',
		margin: 16,
		right: 0,
		bottom: 0,
	},
})
