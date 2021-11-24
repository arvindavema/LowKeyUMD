import React, { useState, useEffect } from "react";
import { SafeAreaView, FlatList, Alert, Platform, Keyboard } from "react-native";
import { styles } from "../CommonComponents";
import { FAB, Button } from "react-native-paper";
import firebase from 'firebase';
import 'firebase/firestore';
import {Card, View} from 'react-native-ui-lib'
import { Ionicons } from '@expo/vector-icons';

export default function FeedScreen({ navigation }) {
  const db = firebase.firestore()
  const [transaction, setTransaction] = useState([])
  const user = firebase.auth().currentUser

  const viewPost = (postID) => {
    navigation.navigate("Post", { postID: postID })
  }
  const likeAction = (postID) => {
    var postRef = db.collection("posts").doc(postID)
    const currUser = firebase.auth().currentUser

    postRef.get().then((doc) => {
      if (doc.exists){
        if( doc.data().liked.includes(currUser.uid)){
          postRef.update({
            liked: firebase.firestore.FieldValue.arrayRemove(currUser.uid)
          })
        }else{
          postRef.update({
            liked: firebase.firestore.FieldValue.arrayUnion(currUser.uid),
            hated: firebase.firestore.FieldValue.arrayRemove(currUser.uid) // remove the user from hated list
          })
        }
      }else{
        console.log("No such document!")
      }
    })
    .catch((error) => {
      Alert.alert("Error", error.message)
    })
  }

  const hateAction =(postID) => { 
    var postRef= db.collection("posts").doc(postID)
    const currUser = firebase.auth().currentUser
    postRef.get().then((doc) => {
      if(doc.exists){
        if(doc.data().hated.includes(currUser.uid)){
          postRef.update({
            hated: firebase.firestore.FieldValue.arrayRemove(currUser.uid) // remove the user from liked list  // remove the user from hated list  
          })
        }else{
          postRef.update({
            hated: firebase.firestore.FieldValue.arrayUnion(currUser.uid),
            liked: firebase.firestore.FieldValue.arrayRemove(currUser.uid) // remove the user from liked list  // remove the user from hated list  
          })
        }
      }else{
        console.log("no such document")
      }
    })
    .catch((err) => {Alert.alert(err.message)})
  }
  const PostIcon = ( btype, data ) =>
  btype == "like" ? (
    data.includes(user.uid) ? (
      <Ionicons name="heart" size={16} color="red" />
    ) : (
      <Ionicons name="heart" size={16} color="grey" />
    )
  ) : btype == "hate" ? (
    data.includes(user.uid) ? (
      <Ionicons name="heart-dislike" size={16} color="red" />
    ) : (
      <Ionicons name="heart-dislike" size={16} color="grey" />
    )
  ) : (
    <Ionicons name="chatbox" size={16} color="grey" />
  );

  const PostCard= ({postID, username, body, created_at, likes, hates, commentCount, liked, hated}) => (
    <Card flex style={{margin:10, padding: 5}} onPress={()=> viewPost(postID)} >
      <Card.Section
      content={[{text: "@" + username + " says: ", text70: true, red10: true} , {text: body, text80: true, grey10: true} , {text: created_at, text90: true, grey10: true} ]}
      style={{padding: 10, flex: 1}}
      />
      <View row left>
        <Button onPress={() => likeAction(postID)} mode="text" icon={() => PostIcon("like", liked)}>{likes}</Button>
        <Button onPress={()=> hateAction(postID)} mode="text" icon={() => PostIcon("hate",hated)}>{hates}</Button>
        <Button onPress={()=> viewPost(postID)} mode="text" icon={() => PostIcon("comment", null)}>{commentCount}</Button>
      </View>  
    </Card>
  )

  useEffect( () => {
    const unsubscribe = db.collection('posts').orderBy("created_at", "desc")
    .onSnapshot( (snapshot) => {
      var posts=[];
      snapshot.forEach( (doc) => {
          const data = {
            id: doc.id,
            username: doc.data().username,
            likes: doc.data().liked.length,
            hates: doc.data().hated.length,
            liked: doc.data().liked,
            hated: doc.data().hated,
            created_at: doc.data().created_at,
            body: doc.data().body,
            commentCount: doc.data().commentCount,
          }
          console.log(data.id.toString())
          posts.push(data)
      });
       setTransaction(posts)
    })
    return unsubscribe
  }, [])

  const renderItem = ({item}) => <PostCard postID={item.id} username={item.username} body={item.body} created_at={item.created_at} likes={item.likes} hates={item.hates} commentCount={item.commentCount} liked={item.liked} hated={item.hated}/>

  return (
    <SafeAreaView style={styles.container}>
        <FlatList
        data={transaction}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        />
      <FAB 
      style={styles.fab}
       color={"#ffff"} 
       small 
       icon="plus" 
       onPress={()=> navigation.navigate("Create")} 
       />
    </SafeAreaView>
  );
}
