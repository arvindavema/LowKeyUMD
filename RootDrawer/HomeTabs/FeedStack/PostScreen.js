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
			const newComment={
				comment: comment,
				user: firebase.auth().currentUser.displayName,
				date: (new Date()),
				liked: [],
				hated: [],
				karma: 0,
			}

			postRef
			.update({
				comments: firebase.firestore.FieldValue.arrayUnion(newComment)
			})

			postRef.update({
				commentCount: firebase.firestore.FieldValue.increment(1)
			})
			setComment('')
		}
	}
	useEffect(() => {
		const unsubscribe = firebase.firestore().collection('posts').doc(postID)
		.get()
		.then((doc)=>{
			if(doc.exists){
				const data = doc.data()
				const allComments= doc.data().comments

				let tempComments=[]
				for(let c=0; c<allComments.length; c++) {
					let curr = allComments[c]
					let d = {comment: curr.comment,
						karma: curr.karma,
						date: curr.date,
						liked: curr.liked,
						hated: curr.hated,
						user: curr.user,}
					tempComments.push(d)
				}

				tempComments.sort(function(a,b){
					return a.karma - b.karma
				})

				setPost(data)
				setComments(tempComments)
			}else{
				setPost(null)
				setComments([])
			}
			return unsubscribe
		})
		.catch((err)=>{
			ErrorAlert("Post Loading Error",err.message)
		})
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
			<Text>{post.commentCount}</Text>
			<Text>{comments.length > 0? comments[0].comment: "Empty"}</Text>
			<Text>{comments.length > 1? comments[1].comment: "Empty"}</Text>


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

