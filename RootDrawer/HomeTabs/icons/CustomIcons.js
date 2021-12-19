import React from 'react'

import {
	AntDesign,
	MaterialCommunityIcons,
	MaterialIcons,
	Ionicons,
	Entypo,
} from '@expo/vector-icons'

const ICON_NAME = {
	feed: 'message-minus',
	notifications: 'notifications',
	trending: 'insert-chart',
	bookmarks: 'bookmarks',
	like: 'heart',
	dislike: 'heart-dislike',
	comments: 'comment-text-multiple',
	delete: 'delete-outline',
	none: 'none',
	addbookmark: 'bookmark-plus',
	removebookmark: 'bookmark-remove',
	create: 'create',
	addcomment: 'comment-edit',
	reply: 'reply',
	karma: 'turtle',
	openmenu: 'menuunfold',
	closemenu: 'menufold',
	filter: 'filter',
	new: 'new',
	hot: 'whatshot',
	provoking: 'chili-mild',
	top: 'medal',
}

export function SuperIcon({ name, focused, size, color }) {
	var n = name.toString().toLowerCase()
	var icon = getIconName(n, focused)

	let res

	switch (n) {
		case 'new':
		case 'top':
			res = <Entypo name={icon} size={size} color={color} />
			break
		case 'bookmarks':
		case 'notifications':
		case 'like':
		case 'create':
		case 'dislike':
			res = <Ionicons name={icon} size={size} color={color} />
			break
		case 'trending':
		case 'hot':
			res = <MaterialIcons name={icon} size={size} color={color} />
			break
		case 'openmenu':
		case 'closemenu':
			res = <AntDesign name={icon} size={size} color={color} />
			break
		default:
			res = (
				<MaterialCommunityIcons name={icon} size={size} color={color} />
			)
			break
	}

	return res
	// You can return any component that you like here!
}

const outline = ['bookmarks', 'notifications', 'feed', 'openmenu', 'closemenu']

const getIconName = (name, focused) => {
	var ending = outline.includes(name) ? '-outline' : '-outlined'

	return ICON_NAME[name] + (focused ? '' : ending)
}
