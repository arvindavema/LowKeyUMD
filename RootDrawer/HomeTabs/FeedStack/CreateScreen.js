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
import { ErrorAlert } from '../../UsefulComponents.js'

export default function CreateScreen({ navigation }) {
	const [postBody, setPostBody] = useState('')

	const db = () => firebase.firestore()
	const user = () => firebase.auth().currentUser

	const savePost = () => {
		const body = postBody
		const date = moment().format('MMMM Do YYYY, h:mm:ss a')

		firebase
			.firestore()
			.collection('posts')
			.add({
				created_at: moment().format('MMMM Do YYYY, h:mm:ss a'),
				body: body,
				postID: '',
				author: user.displayName,
				authorID: user.uid,
				likes: [],
				dislikes: [],
				comments: [],
				commentCount: 0,
				likeCount: 0,
				dislikeCount: 0,
				karma: 0,
			})
			.then((docRef) => {
				const docID = docRef.id
				db.collection('posts')
					.doc(docID)
					.update({
						postID: docID,
					})
					.then(() => {
						db.collection('users')
							.doc(user.displayName)
							.update({
								posts: firebase.firestore.FieldValue.arrayUnion(docID),
							})
							.then(() => {
								ToastMessage('Added POST to users data')
							})
							.catch((err) => {
								ErrorAlert('Faild to add post to users data', err.message)
							})
					})
					.catch((err) => {
						ErrorAlert('Faild to add post to users data', err.message)
						console.error(err)
					})
			})
			.catch((err) => {
				ErrorAlert('Faild to add post to users data', err.message)
				console.error(err)
			})
	}

	const cancelInput = () => {
		setPostBody('')
		navigation.goBack()
	}

	const postInput = () => {
		console.log('Submit Pressed: \n\n' + postBody + '\n\n')
		savePost()
		navigation.goBack()
	}

	const onSubmit = () => {
		if (postBody != '') {
			Alert.alert('New Post:', `Are you sure you want to Submit your post: ${postBody}`, [
				{ text: 'Cancel', onPress: () => cancelInput() },
				{ text: 'OK', onPress: () => postInput() },
			])
		} else {
			ToastMessage('Post body required.')
		}
	}

	return (
		<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<ScrollView keyboardDismissMode='on-drag'>
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

					<Button label={'Post'} backgroundColor={'#ff0000'} onPress={onSubmit} style={styles.button} />

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
