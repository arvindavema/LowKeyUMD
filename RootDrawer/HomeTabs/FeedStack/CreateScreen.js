import React, { useState, useEffect } from 'react'
import {
	Alert,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	TouchableWithoutFeedback,
	Keyboard,
	Image,
} from 'react-native'
import uuid from 'uuid'
import * as Clipboard from 'expo-clipboard'
import * as ImagePicker from 'expo-image-picker'
import { Button } from 'react-native-ui-lib'
import { TextInput, Title } from 'react-native-paper'
import { styles } from '../CommonComponents.js'
import firebase from 'firebase'
import 'firebase/firestore'
import moment from 'moment'

export default function CreateScreen({ navigation }) {
	const [postBody, setPostBody] = useState('')

	const savePost = () => {
		const db = firebase.firestore()
		var user = firebase.auth().currentUser
		const body = postBody

		const date = moment().format('MMMM Do YYYY, h:mm:ss a')

		db.collection('posts')
			.add({
				created_at: date,
				body: body,
				author: user.displayName,
				likes: [],
				dislikes: [],
				comments: [],
				commentCount: 0,
				likeCount: 0,
				dislikeCount: 0,
				karma: 0,
			})
			.then((docRef) => {
				db.collection('users')
					.doc(user)
					.update({
						posts: firebase.firestore.FieldValue.arrayUnion(
							docRef.id
						),
					})
					.then(() => {
						Alert.alert('Successfully submitted post')
					})
					.catch((err) => {
						Alert.alert('something happened while saving this post')
						console.log(err)
					})
			})
			.catch((err) => {
				Alert.alert(err)
			})
	}

	const cancelInput = () => {
		setPostBody('')
		navigation.goBack()
	}

	const postInput = () => {
		console.log('Submit Pressed: ' + postBody)
		savePost()
		navigation.goBack()
	}

	const onSubmit = () => {
		if (postBody !== '') {
			Alert.alert(
				'New Post',
				'Are you sure you want to Submit your post: ' +
					postBody.toString(),
				[
					{ text: 'Cancel', onPress: () => cancelInput() },
					{ text: 'OK', onPress: () => postInput() },
				]
			)
		} else {
			Alert.alert('Uh Oh!', 'Post can not be empty!')
		}
	}

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={{ flex: 1 }}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<ScrollView keyboardDismissMode='on-drag'>
					{/* <TextField
           			showCharacterCounter
            		placeholder={"Post Body"}
					floatingPlaceholder
					maxLength={250}
					floatOnFocus
					multiline
					style={styles.inputBox}
					value={postBody}
					onChangeText={(text) => setPostBody(text)}
					/> */}
					<Title
						style={{
							marginTop: 10,
							color: '#ff0000',
							justifyContent: 'center',
							textAlign: 'center',
						}}>
						New Post
					</Title>
					<TextInput
						style={styles.inputBox}
						mode='outlined'
						multiline={true}
						outlineColor='red'
						label='Post Body'
						value={postBody}
						onChangeText={(text) => setPostBody(text)}
					/>

					<Button
						label={'Post'}
						backgroundColor={'#ff0000'}
						onPress={onSubmit}
						style={styles.button}
					/>

					<Button
						outline
						outlineColor={'#ff0000'}
						label={'Cancel'}
						onPress={cancelInput}
						style={styles.button}
					/>
				</ScrollView>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	)
}
