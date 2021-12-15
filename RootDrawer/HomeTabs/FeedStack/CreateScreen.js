import React, {useState, useEffect} from 'react';
import {Alert, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import uuid from 'uuid';
import * as Clipboard from 'expo-clipboard';
import * as ImagePicker from 'expo-image-picker';
import {Button} from 'react-native-ui-lib';
import {TextInput,Title} from 'react-native-paper'
import {styles}  from '../CommonComponents.js';
import firebase from 'firebase';
import 'firebase/firestore';
import moment from 'moment'


async function uploadImageAsync(uri) {
  const blob = await new Promise((resolve, reject) => {
	const xhr = new XMLHttpRequest();
	xhr.onload = function() {
	  resolve(xhr.response);
	};
	xhr.onerror = function(e) {
	  console.log(e);
	  reject(new TypeError('Network request failed'));
	};
	xhr.responseType = 'blob';
	xhr.open('GET', uri, true);
	xhr.send(null);
  });

	const storage = firebase.storage();
  	const snapshot = await storage.ref().child("post_images/" + uuid.v4()).put(blob);
	const remoteUri = await snapshot.ref.getDownloadURL()
	
	blob.close();
	return remoteUri  // We're done with the blob, close and release it
}

export default function CreateScreen({ navigation }) {
	const [postBody, setPostBody]= useState("")
	const [image, setImage]= useState(null)
	const [uploading, setUploading]= useState(false)
	useEffect(()=>{
		(async ()=> {
			if(Platform.OS !=='web'){
				const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
				if(status !== 'granted'){
					Alert.alert('Sorry, we need camera roll permissions to make this work!')
				}
			}
		})
	},[])

	const handleImagePicked = async (result) => {
		try{
			setUploading(true)
			if(!result.cancelled){
				const uploadUrl = await uploadImageAsync(result.uri)
				setImage(uploadUrl)
				Alert.alert('Image Picked', image)
			}
		} catch(err) {
			console.log(err)
			Alert.alert("handleImagePicked", err.message) 
		} finally {
			setUploading(false)
		}

	}

	const copyToClipboard = () => {
		Clipboard.setString(this.state.image);
		alert("Copied image URL to clipboard");
	  };

	const takePhoto= async () => {
		let result = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1
		});
		handleImagePicked(result)
		

	}
	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		})
		console.log(result)
		if(!result.cancelled){
			handleImagePicked(result)
			Alert.alert("image picked", image)
		}
	}
	
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
				image: image,
				created_at: date,
				body: body,
				username: user.displayName,
				liked: [],
				hated: [],
				comments: [],
				commentCount: 0
			})
			.then((docRef)=>{
				db.collection("users").doc(user.displayName).update({
				posts: firebase.firestore.FieldValue.arrayUnion(docRef.id)
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
			<ScrollView keyboardDismissMode="on-drag">
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
					<Title style={{marginTop:10,color:"#ff0000",justifyContent: "center", textAlign: "center"}}>New Post</Title>
					<TextInput
					style={styles.inputBox}
					mode="outlined"
					multiline={true}
					outlineColor="red"
					label="Post Body"
					value={postBody}
					onChangeText={(text) => setPostBody(text)}
					/>
					<Button style={styles.button} color="white" label="Add Photo" onPress={pickImage} backgroundColor="grey"/>

					{image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

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
