import React, { useState, useEffect } from 'react'
import { SafeAreaView, FlatList, Alert } from 'react-native'
import { styles } from '../CommonComponents'
import { FAB, Button } from 'react-native-paper'
import firebase from 'firebase'
import 'firebase/firestore'
import { Card, View } from 'react-native-ui-lib'

import { SuperIcon } from '../icons/CustomIcons.js'
function PostIcon({ btype, data }) {
	var color = 'grey'

	let currName = firebase.auth().currentUser.displayName
	if (data == null || btype == null || btype == 'comments') {
		color = 'grey'
	} else {
		switch (btype) {
			case 'comments':
				color = 'grey'
				break
			case 'delete':
				color = data != currName ? 'white' : 'grey'

				break
			case 'like':
			case 'dislike':
				color = data.includes(currName) ? 'red' : 'grey'
				break
			default:
				color = 'grey'
				break
		}
	}
	console.log('icon: ' + btype)

	return <SuperIcon focused={true} name={btype} size={24} color={color} />
}

export default function FeedScreen({ navigation }) {
	const [transaction, setTransaction] = useState([])
	const user = firebase.auth().currentUser
	const currName = user ? user.displayName : ''

	const viewPost = (postID) => {
		navigation.navigate('Post', { postID: postID })
	}

	const deleteAction = (postID) => {
		Alert.alert(
			'Delete Post',
			'Are you sure you want to delete this post?',
			[
				{
					text: 'Cancel',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel',
				},
				{
					text: 'OK',
					onPress: () => {
						firebase
							.firestore()
							.collection('posts')
							.doc(postID)
							.delete()
							.then(() => {
								const username =
									firebase.auth().currentUser.displayName
								firebase
									.firestore()
									.collection('users')
									.doc(username)
									.update({
										posts: firebase.firestore.FieldValue.arrayRemove(
											postID.toString()
										),
									})

								Alert.alert(
									'Post deleted',
									'Post deleted successfully'
								)
							})
							.catch((err) => {
								ErrorAlert('Post Delete error', err.message)
							})
					},
				},
			],
			{ cancelable: false }
		)
	}

	const likeAction = (postID) => {
		var postRef = firebase.firestore().collection('posts').doc(postID)
		const currName = firebase.auth().currentUser.displayName
		postRef
			.get()
			.then((doc) => {
				if (doc.exists) {
					if (doc.data().likes.includes(currName)) {
						postRef.update({
							likes: firebase.firestore.FieldValue.arrayRemove(
								currName
							),
							likeCount:
								firebase.firestore.FieldValue.increment(-1),
						})
					} else {
						postRef.update({
							likes: firebase.firestore.FieldValue.arrayUnion(
								currName
							),
							likeCount:
								firebase.firestore.FieldValue.increment(1),
						})
					}
					if (doc.data().dislikes.includes(currName)) {
						postRef.update({
							dislikes:
								firebase.firestore.FieldValue.arrayRemove(
									currName
								),
							dislikeCount:
								firebase.firestore.FieldValue.increment(-1),
						})
					}
				} else {
					console.log('No such document!')
				}
			})
			.catch((error) => {
				Alert.alert('Error', error.message)
			})
	}

	//Action when hate button is clicked. It will remove the user from the liked list and add it to the hated list by acessing the firestore database
	const hateAction = (postID) => {
		var postRef = firebase.firestore().collection('posts').doc(postID)

		postRef
			.get()
			.then((doc) => {
				if (doc.exists) {
					if (doc.data().dislikes.includes(currName)) {
						postRef.update({
							dislikes:
								firebase.firestore.FieldValue.arrayRemove(
									currName
								),
							dislikeCount:
								firebase.firestore.FieldValue.increment(-1),
						})
					} else {
						postRef.update({
							dislikes:
								firebase.firestore.FieldValue.arrayUnion(
									currName
								),
							dislikeCount:
								firebase.firestore.FieldValue.increment(1),
						})
					}

					if (doc.data().likes.includes(currName)) {
						postRef.update({
							likes: firebase.firestore.FieldValue.arrayRemove(
								currName
							),
							likeCount:
								firebase.firestore.FieldValue.increment(-1),
						})
					}

					console.log('no such document')
				}
			})
			.catch((error) => {
				console.log(error.message)
			})
	}

	//Component that returns an icon depending on btype (button type) and if the user has liked or hated the post. the data passed to this component depends on the button type. for like and hate, the list of users who liked or hated the post is passed. If  btype is comment, the number of comments for that post is passed. The username of the post author is passed if the btype is "delete".

	const getIcon = (btype, data) => <PostIcon btype={btype} data={data} />
	const PostCard = ({
		postID,
		username,
		body,
		likeCount,
		dislikeCount,
		created_at,
		commentCount,
		likes,
		dislikes,
	}) => {
		return (
			<Card
				flex
				style={{ margin: 10, padding: 5 }}
				onPress={() => viewPost(postID)}>
				<Card.Section
					content={[
						{ text: `@${username}`, text40: true, red20: true },
					]}
					style={{
						flex: 1,
						margin: 5,
					}}
				/>

				<Card.Section
					content={[{ text: body, text30L: true, grey10: true }]}
					style={{
						flex: 1,
						margin: 5,
						padding: 10,
					}}
				/>
				<Card.Section
					left
					content={[
						{ text: created_at, text80L: true, grey20: true },
					]}
					style={{
						flex: 1,
						margin: 5,
						marginBottom: 20,
					}}
				/>

				<View row right>
					<Button
						onPress={() => likeAction(postID)}
						mode='text'
						icon={() => getIcon('like', likes)}>
						{likeCount}
					</Button>
					<Button
						onPress={() => hateAction(postID)}
						mode='text'
						icon={() => getIcon('dislike', dislikes)}>
						{dislikeCount}
					</Button>
					<Button
						onPress={() => viewPost(postID)}
						mode='text'
						icon={() => getIcon('comments', [])}>
						{commentCount}
					</Button>
					<Button
						onPress={() => {
							if (currName == username) {
								deleteAction(postID)
							} else {
								Alert.alert(
									'Wait a second!',
									'You dont have permission to do that!'
								)
							}
						}}
						mode='text'
						icon={() => getIcon('delete', username)}></Button>
				</View>
			</Card>
		)
	}

	//Getting all posts
	useEffect(() => {
		return firebase
			.firestore()
			.collection('posts')
			.orderBy('created_at', 'desc')
			.onSnapshot((snapshot) => {
				var posts = []
				snapshot.forEach((doc) => {
					const data = {
						id: doc.id,
						username: doc.data().author,
						likeCount: doc.data().likeCount,
						dislikeCount: doc.data().dislikeCount,
						likes: doc.data().likes,
						dislikes: doc.data().dislikes,
						created_at: doc.data().created_at,
						body: doc.data().body,
						comments: doc.data().comments,
						commentCount: doc.data().commentCount,
					}
					posts.push(data)
				})
				setTransaction(posts)
			})
	}, [])

	const renderItem = ({ item }) => (
		<PostCard
			postID={item.id}
			username={item.username}
			body={item.body}
			created_at={item.created_at}
			likeCount={item.likeCount}
			dislikeCount={item.dislikeCount}
			commentCount={item.commentCount}
			likes={item.likes}
			dislikes={item.dislikes}
		/>
	)

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				data={transaction}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
			/>
			<FAB
				style={styles.fab}
				color={'#ffff'}
				small
				icon='plus'
				onPress={() => navigation.navigate('Create')}
			/>
		</SafeAreaView>
	)
}
