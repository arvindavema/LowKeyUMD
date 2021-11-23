import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import { styles } from "./CommonComponents";
import { FAB, Provider } from "react-native-paper";
import firebase from 'firebase';
import 'firebase/firestore';


export default function FeedScreen({ navigation }) {
  const db = firebase.firestore()
  const [transaction, setTransaction] = useState([])
  
  useEffect( () => {
    const unsubscribe = db.collection('posts').orderBy("created_at")
    .onSnapshot( (snapshot) => {
      var posts=[];
      snapshot.forEach( (doc) => {
        posts.push(doc.data())
        console.log(doc.data().body.toString())
      });
      if(posts) setTransaction(posts)
    })
    return unsubscribe
  }, [])
  return (
    <Provider>
      <ScrollView>
        <Text>FEED</Text>
      </ScrollView>
      <FAB 
      style={styles.fab}
       color={"#ffff"} 
       small 
       icon="plus" 
       onPress={()=> navigation.navigate("Create")} 
       />
    </Provider>
  );
}
