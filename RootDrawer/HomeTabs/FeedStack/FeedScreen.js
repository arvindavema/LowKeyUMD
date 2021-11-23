import React, { useState, useEffect } from "react";
import { SafeAreaView, FlatList, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import { styles } from "../CommonComponents";
import { FAB, Button } from "react-native-paper";
import firebase from 'firebase';
import 'firebase/firestore';
import {Card, View} from 'react-native-ui-lib'
import { Ionicons } from '@expo/vector-icons';

function postIcon(btype){
  if(btype=="like"){
    return <Ionicons name="heart" size={16} color="grey" />
  }else if(btype=="hate"){
    return <Ionicons name="heart-dislike" size={16} color="grey" />
  }else{
    return <Ionicons name="chatbox" size={16} color="grey" />
  }
}

const PostCard= ({username, body, created_at, likes, hates}) => (
  <Card flex style={{margin:10, padding:5}}>
    <Card.Section
    content={[{text: "@" + username + " says: ", text70: true, red10: true} , {text: body, text80: true, grey10: true} , {text: created_at, text90: true, grey10: true} ]}
    style={{padding: 10, flex: 1}}
    />

    <View row left>
      <Button mode="text" icon={() => postIcon("like")}>{likes}</Button>
      <Button mode="text" icon={() => postIcon("hate")}>{hates}</Button>
      <Button mode="text" icon={() => postIcon("comment")}>{0}</Button>
    </View>

  </Card>
)

export default function FeedScreen({ navigation }) {
  const db = firebase.firestore()
  const [transaction, setTransaction] = useState([])
  
  useEffect( () => {
    const unsubscribe = db.collection('posts').orderBy("created_at", "desc")
    .onSnapshot( (snapshot) => {
      var posts=[];
      snapshot.forEach( (doc) => {
   
          const data = {
            id: doc.id,
            username: doc.data().username, 
            likes: doc.data().likes, 
            hates: doc.data().hates, 
            created_at: doc.data().created_at,
            body: doc.data().body}

          console.log(data.id.toString())
          posts.push(data)
      });
       setTransaction(posts)
    })
    return unsubscribe
  }, [])

  const renderItem = ({item}) => <PostCard username={item.username} body={item.body} created_at={item.created_at} likes={item.likes} hates={item.hates}/>  

  return (
    <SafeAreaView style={{flex: 1}}>
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
