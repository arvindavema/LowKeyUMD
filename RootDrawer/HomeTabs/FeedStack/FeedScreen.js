import React, {useState, useEffect} from 'react'
import {SafeAreaView, FlatList, Alert} from 'react-native'
import {styles} from '../CommonComponents'
import { Button, FAB } from 'react-native-paper'
import firebase from 'firebase'
import 'firebase/firestore'
import {
	Card,
	View,
	PanningProvider,
	Constants,
	Dialog,
	Colors
} from 'react-native-ui-lib'
import {SuperIcon} from '../icons/CustomIcons.js'
function PostIcon({btype, data}) {
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
	return <SuperIcon focused={true} name={btype} size={24} color={color} />
}

export default function FeedScreen({navigation}) {
	const [ feed, setFeed ] = useState({})

	const auth = firebase.auth()
	const user = auth.currentUser
	const currName = user ? user.displayName : ''
	const db = firebase.firestore()
	const postsRef = db.collection('posts')

	const viewPost = (postID) => {
		navigation.navigate('Post', {postID: postID})
	}

	const deleteAction = (postID) => {
		Alert.alert(
			'Delete Post',
			'Are you sure you want to delete this post?',
			[
				{
					text: 'Cancel',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel'
				},
				{
					text: 'OK',
					onPress: () => {
						postsRef
							.doc( postID )
							.delete()
							.then(() => {
								db.collection('users')
									.doc(currName)
									.update({
										posts: firebase.firestore.FieldValue.arrayRemove(
											postID
										)
									})
								Alert.alert(
									'Post deleted',
									'Post deleted successfully'
								)
							})
							.catch((err) => {
								Alert.alert('Post Delete error', err.message)
							})
					}
				}
			],
			{cancelable: false}
		)
	}

	const likeAction = (postID) => {
		firebase.firestore().collection('posts')
			.doc( postID )
			.get()
			.then((doc) => {
				if (doc.exists) {
					if (doc.data().likes.includes(currName)) {
						firebase
							.firestore()
							.collection('posts')
							.doc(postID)
							.update({
								likes: firebase.firestore.FieldValue.arrayRemove(currName),
								likeCount: firebase.firestore.FieldValue.increment(-1)
							})
					} else {
						firebase
							.firestore()
							.collection('posts')
							.doc(postID)
							.update({
								likes: firebase.firestore.FieldValue.arrayUnion(currName),
								likeCount: firebase.firestore.FieldValue.increment(1)
							})
					}
					if (doc.data().dislikes.includes(currName)) {
						firebase
							.firestore()
							.collection('posts')
							.doc(postID)
							.update({
								dislikes: firebase.firestore.FieldValue.arrayRemove(currName),
								dislikeCount: firebase.firestore.FieldValue.increment(-1)
							})
					}
				}
			})
			.catch((error) => {
				Alert.alert('Error', error.message)
			})
	}

	//Action when hate button is clicked. It will remove the user from the liked list and add it to the hated list by acessing the firestore database
	const hateAction = (postID) => {
		firebase
			.firestore()
			.collection('posts')
			.doc(postID)
			.get()
			.then((doc) => {
				if (doc.exists) {
					if (doc.data().dislikes.includes(currName)) {
						firebase
							.firestore()
							.collection('posts')
							.doc(postID)
							.update({
								dislikes: firebase.firestore.FieldValue.arrayRemove(currName),
								dislikeCount: firebase.firestore.FieldValue.increment(-1)
							})
					} else {
						firebase
							.firestore()
							.collection('posts')
							.doc(postID)
							.update({
								dislikes: firebase.firestore.FieldValue.arrayUnion(currName),
								dislikeCount: firebase.firestore.FieldValue.increment(1)
							})
					}
					if (doc.data().likes.includes(currName)) {
						firebase
							.firestore()
							.collection('posts')
							.doc(postID)
							.update({
								likes: firebase.firestore.FieldValue.arrayRemove(currName),
								likeCount: firebase.firestore.FieldValue.increment(-1)
							})
					}
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
		author,
		body,
		likeCount,
		dislikeCount,
		created_at,
		commentCount,
		likes,
		dislikes
	} ) =>
	{
		return <Card
				flex
				style={styles.container}
			onPress={ () =>
			{
				viewPost( postID )
			}}
			>
				<Card.Section
					content={[{text: `@${author}`, text40: true, red20: true}]}
					style={{
						flex: 1,
						margin: 5
					}}
				/>

				<Card.Section
					content={[{text: body, text30L: true, grey10: true}]}
					style={{
						flex: 1,
						margin: 5,
						padding: 10
					}}
				/>
				<Card.Section
					left
					content={[{text: created_at, text80L: true, grey20: true}]}
					style={{
						flex: 1,
						margin: 5,
						marginBottom: 20
					}}
				/>

				<View row right>
					<Button
						onPress={() => likeAction(postID) }
						mode='text'
						icon={() => getIcon('like', likes)}
					>
						{likeCount}
					</Button>

					<Button
						onPress={() => hateAction(postID)}
						mode='text'
						icon={() => getIcon('dislike', dislikes)}
					>
						{dislikeCount}
					</Button>
					<Button
						onPress={() => viewPost(postID)}
						mode='text'
						icon={() => getIcon('comments', [])}
					>
						{commentCount}
					</Button>

					<Button
					onPress={ () => deleteAction( postID ) }
					mode='text'
					icon={() => getIcon('delete', author)}>
					</Button>
				</View>
			</Card>
	}

	//Getting all posts
	useEffect(() => {
		firebase
			.firestore()
			.collection( 'posts' )
			.orderBy('created_at', 'desc')
			.get()
			.then((snapshot) => {
				const posts = []
				var i = 0
				snapshot.forEach(doc => {
					const data = doc.data()
					const item = {
						key: i.toString(),
						postID: data.postID,
						body: data.body,
						likes: data.likes,
						dislikes: data.dislikes,
						commentCount: data.commentCount,
						created_at: data.created_at,
						likeCount: data.likeCount,
						author: data.author,
						dislikeCount: data.dislikeCount
					}
					posts.push( item )
					i++
				})
				setFeed( posts )
				console.log(feed)
			})
			.catch( ( err ) =>
			{
				Alert.alert('FEED SCREEN: ', err.message)
			})
	}, [])

	const renderItem = ({item}) => (
		<PostCard
			key={ item.key }
			postID={item.postID}
			author={item.author}
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
				data={feed}
				renderItem={renderItem}
				keyExtractor={(item)=> item.key}
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
