import React, { useState, useEffect } from "react";
import { SafeAreaView, FlatList, Alert } from "react-native";
import { styles } from "../CommonComponents";
import { FAB, Button } from "react-native-paper";
import firebase from 'firebase';
import 'firebase/firestore';
import {Card, View} from 'react-native-ui-lib'
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-root-toast'
import {ToastMessage, ErrorAlert,LogError, LogInfo} from '../../UsefulComponents.js'



export default function FeedScreen({ navigation }) {
  const db = firebase.firestore()
  const auth = firebase.auth()

  const [transaction, setTransaction] = useState([])
  const user = auth.currentUser

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
    .catch((err) => {
      Alert.alert(err.message)
    })
  }

  const PostIcon = ( btype, data ) => {
      btype == "like" ? 
      (data.includes(user.uid) ?
        <Ionicons name="heart" size={20} color="red" /> :
        <Ionicons name="heart" size={20} color="grey" />
      ) :
      (btype == "hate" ?
        (data.includes(user.uid) ?
          <Ionicons name="heart-dislike" size={20} color="red" /> :
          <Ionicons name="heart-dislike" size={20} color="grey" />
        ) :
        (btype == "delete" ?
          (data == firebase.auth().currentUser.displayName ?    
            <Ionicons name="trash-outline" size={20} color="blue"/> : 
            <Ionicons name="trash-outline" size={20} color="white"/>
          ) : 
          <Ionicons name="chatbox" size={20} color="grey" />
        )
      )
  }

  const PostCard= ({
    postID,
     username, 
     body, 
     created_at, 
     likes, 
     hates, 
     commentCount, 
     liked,
      hated
    }) =>  <Card flex style={{margin:10, padding: 5}} onPress={()=> viewPost(postID)} >
      <Card.Section
      content={[ 
          { text: "@" + username,   text70: true,  red10: true} ,
          { text: body,  text80: true, grey10: true} , 
          { text: created_at, text90: true, grey10: true }, 
      ]}
      style={{
        padding: 10,
        flex: 1
      }}
      />
      
      <View row left>
        <Button onPress={() => likeAction(postID)} mode="text" icon={() => PostIcon("like", liked)}>{likes}</Button>
        <Button onPress={()=> hateAction(postID)} mode="text" icon={() => PostIcon("hate",hated)}>{hates}</Button>
        <Button onPress={()=> viewPost(postID)} mode="text" icon={() => PostIcon("comment", null)}>{commentCount}</Button>
        <Button onPress={()=>{Alert.alert("delete pressed", "delete action")}} mode="text" icon={()=> PostIcon("delete", username)}>{Delete}</Button>
      </View>
    </Card>
  

  //Getting all posts 
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

  const renderItem = ({item}) => <PostCard 
  postID={item.id} 
  username={item.username} 
  body={item.body} 
  created_at={item.created_at} 
  likes={item.likes} 
  hates={item.hates} 
  commentCount={item.commentCount} 
  liked={item.liked}
  hated={item.hated}/>
  

  ToastMessage('Logged In!')

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
