import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore'

export default function PostScreen({navigation, route}){
	const [comments, setComments] = useState([])
	const [post, setPost] = useState({})
	const {postID} = route.params
	var postRef = firebase.firestore().collection('posts').doc(postID)
	var commentsCollection = postRef.collection('comments')

	useEffect( () => {
		const unsubscribe = commentsCollection.orderBy("created_at", "desc").onSnapshot(snapshot => {
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
		<View>
			<Text>Post</Text>
			<Text>{post.username}</Text>
			<Text>{post.body}</Text>
			<Text>{post.created_at}</Text>
			<Button title="Back" onPress={() => navigation.goBack()} />
		</View>
	);
};

const styles = StyleSheet.create({});
