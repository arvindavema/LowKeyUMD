import React, { useState, useEffect } from "react";
import { SafeAreaView, FlatList, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import { styles } from "../CommonComponents";
import { FAB, Provider } from "react-native-paper";
import firebase from 'firebase';
import 'firebase/firestore';
import {Card, Button, CardProps,Text} from 'react-native-ui-lib'

const PostCard= ({username, body, created_at, likes, hates}) => (
  <Card flex style={{margin:10, padding:5}}>
    <Card.Section
    content={[{text: username, text70: true, grey10: true} , {text: body, text80: true, grey10: true} , {text: created_at, text90: true, grey10: true} ]}
    style={{padding: 10, flex: 1}}
    />
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
        const data = doc.data()
        console.log(data.toString())
        posts.push(data)
      });
      if(posts) setTransaction(posts)
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
