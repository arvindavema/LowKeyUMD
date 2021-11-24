import React, {useState, useEffect} from 'react';
import {Alert, View, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native'

import {
	Button, TextField,
} from 'react-native-ui-lib';

import {Provider} from 'react-native-paper'

import {styles}  from '../CommonComponents.js';
import firebase from 'firebase';
import 'firebase/firestore';
import moment from 'moment'


export default function CreateScreen({ navigation }) {
	const [postBody, setPostBody]= useState("")

	const savePost= ()=> {
		const auth = firebase.auth()
		const db = firebase.firestore()
		const user = auth.currentUser
		const body = postBody

		if(user){
			if(user.emailVerified){
				const date = moment().format('MMMM Do YYYY, h:mm:ss a');

			db.collection('posts')
			.add( {
				created_at: date,
				body: body,
				uid: user.uid,
				username: user.displayName,
				liked: [],
				hated: [],
				commentCount: 0
			})
			.then((docRef)=>{
				db.collection("users").doc(user.uid).update({
				posts: firebase.firestore.FieldValue.arrayUnion(docRef)
				}).then(() => {
					Alert.alert("Successfully submitted post")
				}
				).catch((err) => {
					Alert.alert("something happened while saving this post")
					console.log(err)
				})
			})
			.catch( (err) => {
				Alert.alert(err)
			})
		}else{
			Alert.alert("Please verify your email")
		}
			
		}else{
			Alert.alert("user not signed in")
		}
	}
	
	const cancelInput = () => {
		setPostBody("")
		navigation.goBack()
	}

	const postInput = () => {
		console.log("Submit Pressed: " + postBody)
		savePost()
		navigation.goBack()
	}

	const onSubmit = () => {
		if(postBody !== "" ){
			Alert.alert( 
				"New Post", 
				"Are you sure you want to Submit your post: " + postBody.toString(),
				[{text: "Cancel", onPress: () => cancelInput()},{text: "OK", onPress:() => postInput()}]
				)
		}else{
			Alert.alert(
				"Uh Oh!", "Post can not be empty!"
			)
		}
		
	}

	return (
		<KeyboardAvoidingView
		behavior={Platform.OS === "ios" ? "padding" : "height"}
		style={{flex: 1}}
	  >
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<ScrollView >
					<TextField
           			showCharacterCounter
            		placeholder={"Post Body"}
					floatingPlaceholder
					maxLength={250}
					floatOnFocus
					multiline
					style={styles.inputBox}
					value={postBody}
					onChangeText={(text) => setPostBody(text)}
					/>

					<Button 
					label={"Post"} 
					backgroundColor={"#ff0000"}
					onPress={onSubmit}
					style={styles.button}					
					/>

					<Button 
					outline 
					outlineColor={"#ff0000"}  
					label={"Cancel"} 
					onPress={cancelInput}
					style={styles.button}
					/>
			</ScrollView>	
		</TouchableWithoutFeedback>
    </KeyboardAvoidingView>
		
	);
}
