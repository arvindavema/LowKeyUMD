import React, {useState,useEffect} from 'react';
import { StyleSheet, ScrollView, Text, View, Alert } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore'
import {Button} from 'react-native-ui-lib'
import {styles} from '../CommonComponents'
import {  FAB, Paragraph, Dialog, Portal, Provider, Title, TextInput } from 'react-native-paper';


export default function PostScreen({navigation, route}){
	const [comments, setComments] = useState([])
	const [visible, setVisible] = useState(false)
	const [comment, setComment] = useState('')
	const [post, setPost] = useState({})
	const {postID} = route.params
	var postRef = firebase.firestore().collection('posts').doc(postID)
	var commentsCollection = postRef.collection('comments')

	const showDialog= () => {
		setComment('')
		
		setVisible(true)
	}
	const hideDialog = () => {
		setComment('')
		setVisible(false)}

	const submitComment=()=>{
		setVisible(false)
		if(comment.length>0){
			commentsCollection.add({
				comment: comment,
				user: firebase.auth().currentUser.uid,
				date: new Date(),
				liked: [],
				hated: [],
				karma: 0,
			})
			postRef.update({
				commentCount: firebase.firestore.FieldValue.increment(1)
			})
			setComment('')
		}
	}
	useEffect( () => {
		const unsubscribe = commentsCollection.orderBy("created_at", "desc").onSnapshot(snapshot => {
			postRef.get().then(doc => {
				setPost(doc.data())
			})
			.catch(err => console.log(err))
			var postComments = []
			snapshot.forEach(doc => {
				postComments.push({
					id: doc.id,
					body: doc.data().body,
					created_at: doc.data().created_at,
					username: doc.data().username,
					user_id: doc.data().user_id,
					post_id: doc.data().post_id,
				})
			})
			setComments(postComments)
		})
		return unsubscribe
	}, [])

	return (
		<Provider>

		<View style={styles.container}>
			<ScrollView keyboardDismissMode={"on-drag"}>

			<Button label="Back" onPress={() => navigation.goBack()} />
			<Text>{post.username}</Text>
			<Text>{post.body}</Text>
			<Text>{post.created_at}</Text>
			<Text>{post.image}</Text>

		</ScrollView>
		<Portal>
			<Dialog visible={visible} onDismiss={hideDialog}>
				<Dialog.Title>Add Comment</Dialog.Title>
				<Dialog.Content>
					<TextInput
					label="Comment"
					mode="outlined"
					value={comment}
					onChangeText={text => setComment(text)}
					/>
				</Dialog.Content>
				<Dialog.Actions>
					<Button label="Cancel" onPress={hideDialog}/>
					<Button label="Submit" onPress={submitComment}/>
				</Dialog.Actions>
			</Dialog>
		</Portal>
		<FAB 
      style={styles.fab}
       color={"#ffff"} 
       small 
       icon="pen" 
       onPress={showDialog} 
       />
		</View>
	</Provider>
	);
};

