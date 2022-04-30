import React, { useState, useEffect } from 'react'
import { ScrollView, Text, View, Alert, FlatList, SafeAreaView, StatusBar } from 'react-native'
import firebase from 'firebase'
import 'firebase/firestore'
import { styles } from '../../UsefulComponents.js'
import {
	FAB,
	Paragraph,
	Dialog,
	Portal,
	Provider,
	Title,
	TextInput,
	List,
	Card,
	Button,
	IconButton,
	Colors,
} from 'react-native-paper'
import moment from 'moment'

async function getCommentData(postID) {
	var result = { post: {}, comments: [] }

	firebase
		.firestore()
		.collection('posts')
		.doc(postID)
		.get()
		.then((doc) => {
			if (doc.exists) {
				result.post = { author, body, createdAt, ...rest } = doc.data()

				firebase
					.firestore()
					.collection('posts')
					.doc(postID)
					.collection('comments')
					.get()
					.then((querySnapshot) => {
						querySnapshot.forEach((doc) => {
							if (doc.exists) {
								const data = { ...doc.data() }

								const comm = {
									id: doc.id,

									body: data.body,

									author: data.author,

									authorID: data.authorID,

									postID: data.postID,

									createdAt: data.createdAt,

									likes: data.likes,

									dislikes: data.dislikes,

									likeCount: data.likes.length,

									dislikeCount: data.dislikes.length,
								}

								result.comments.push(comm)
							}
						})
					})
			}
		})

	return result
}

export default function PostScreen({ navigation, route }) {
	const [comments, setComments] = useState([])
	const [visible, setVisible] = useState(false)
	const [post, setPost] = useState({})
	const [comment, setComment] = useState('')

	const db = () => {
		return firebase.firestore().collection('posts')
	}
	const auth = () => {
		return firebase.auth()
	}

	const { postID, ...rest } = route.params

	useEffect(() => {
		const unsubscribe = getCommentData(postID)
		setPost({ ...unsubscribe.post })
		setComments(unsubscribe.comments)
	}, [])

	const showDialog = () => {
		setComment('')
		setVisible(true)
	}

	const hideDialog = () => {
		setComment('')
		setVisible(false)
	}

	const submitComment = () => {
		setVisible(false)

		firebase
			.firestore()
			.collection('posts')
			.doc(postID)
			.collection('comments')
			.add({
				body: comment,
				author: auth().currentUser.displayName,
				authorID: auth().currentUser.uid,
				createdAt: moment().format('MM-DD-YYYY HH:mm:ss a'),
				postID: postID,
				likes: [auth().currentUser.uid],
				dislikes: [],
				likeCount: 1,
				dislikeCount: 0,
			})
			.then((docRef) => {
				console.log('Document written with ID: ', docRef.id)
			})
			.catch((error) => {
				ErrorAlert('Error adding comment: ', error.message)
			})
	}

	const renderItem = ({ comm }) => {
		return (
			<Card>
				<Card.Title title={comm.author} subtitle={createdAt} />

				<Card.Content>
					<Paragraph>
						<Text>{comm.body}</Text>
					</Paragraph>
				</Card.Content>

				<Card.Actions>
					<Button>Like</Button>
					<Button>Dislike</Button>
					<Button>Delete</Button>
					<Button>Reply</Button>
				</Card.Actions>
			</Card>
		)
	}

	return (
		<Provider>
			<SafeAreaView style={styles.container}>
				<IconButton
					icon='camera'
					color={Colors.red500}
					size={20}
					onPress={() => {
						navigation.goBack()
					}}
				/>

				<Card>
					<Card.Title title='Author' subtitle='MM-DD-YYYY HH:mm a' />
					<Card.Content>
						<Paragraph>post.body</Paragraph>
						<Text>post.commentCount</Text>
					</Card.Content>
					<Card.Actions>
						<Button>Refresh</Button>
					</Card.Actions>
				</Card>

				<FlatList data={comments} renderItem={(item) => renderItem(item)} keyExtractor={(item) => item.id} />
				<Portal>
					<Dialog visible={visible} onDismiss={hideDialog}>
						<Dialog.Title>Add Comment</Dialog.Title>
						<Dialog.Content>
							<TextInput
								label='Comment'
								mode='outlined'
								value={comment}
								onChangeText={(text) => setComment(text)}
							/>
						</Dialog.Content>
						<Dialog.Actions>
							<Button
								icon='camera'
								mode='text'
								onPress={() => {
									hideDialog()
								}}>
								Cancel
							</Button>
							<Button
								icon='camera'
								mode='text'
								onPress={() => {
									submitComment()
								}}>
								Submit
							</Button>
						</Dialog.Actions>
					</Dialog>
				</Portal>
				<FAB style={styles.fab} color={'#ffff'} small icon='pen' onPress={showDialog} />
			</SafeAreaView>
		</Provider>
	)
}
