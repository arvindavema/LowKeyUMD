import React, { useState, useEffect } from "react";
import { SafeAreaView, FlatList, Alert } from "react-native";
import { styles } from "../CommonComponents";
import { FAB, Button } from "react-native-paper";
import firebase from "firebase";
import "firebase/firestore";
import { Card, View } from "react-native-ui-lib";
import { Ionicons } from "@expo/vector-icons";
import {
  LikeButton,
  HateButton, 
  DeleteButton, 
  CommentButton
} from '../../../Components/MyBottons.js'

export default function FeedScreen({ navigation }) {
  const [transaction, setTransaction] = useState([]);

  const viewPost = (postID) => {
    navigation.navigate("Post", { postID: postID });
  }

  const deleteAction = (postID) => {
    Alert.alert(
      "Delete Post",
      "Are you sure you want to delete this post?",
       [
         {
           text: "Cancel",
            onPress: () => console.log("Cancel Pressed"), 
            style: "cancel"
          },
          {
            text: "OK", 
            onPress: () => {
              
              firebase.firestore()
              .collection("posts")
              .doc(postID)
              .delete()
              .then(() => {
                const username = firebase.auth().currentUser.displayName;
                firebase.firestore().collection("users").doc(username).update({posts: firebase.firestore.FieldValue.arrayRemove(postID.toString())})

                Alert.alert("Post deleted","Post deleted successfully");
              })
              .catch((err) => {
                ErrorAlert("Post Delete error",err.message)
              });
            }
          }
        ],
        { cancelable: false }
      )
  }

  const likeAction = (postID) => {
    var postRef = firebase.firestore().collection("posts").doc(postID);
    const currUser = firebase.auth().currentUser;

    postRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          if (doc.data().liked.includes(currUser.displayName)) {
            postRef.update({
              liked: firebase.firestore.FieldValue.arrayRemove(
                currUser.displayName
              ),
            });
          } else {
            postRef.update({
              liked: firebase.firestore.FieldValue.arrayUnion(
                currUser.displayName
              ),
              hated: firebase.firestore.FieldValue.arrayRemove(
                currUser.displayName
              ), // remove the user from hated list
            });
          }
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  //Action when hate button is clicked. It will remove the user from the liked list and add it to the hated list by acessing the firestore database
  const hateAction = (postID) => {
    var postRef = firebase.firestore().collection("posts").doc(postID);
    const currUser = firebase.auth().currentUser;

    postRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          if (doc.data().hated.includes(currUser.displayName)) {
            postRef.update({
              hated: firebase.firestore.FieldValue.arrayRemove(
                currUser.displayName
              ), // remove the user from liked list  // remove the user from hated list
            });
          } else {
            postRef.update({
              hated: firebase.firestore.FieldValue.arrayUnion(
                currUser.displayName
              ),
              liked: firebase.firestore.FieldValue.arrayRemove(
                currUser.displayName
              ), // remove the user from liked list  // remove the user from hated list
            });
          }
        } else {
          console.log("no such document");
        }
      })
      .catch((err) => {
        Alert.alert(err.message);
      });
  };

  //Component that returns an icon depending on btype (button type) and if the user has liked or hated the post. the data passed to this component depends on the button type. for like and hate, the list of users who liked or hated the post is passed. If  btype is comment, the number of comments for that post is passed. The username of the post author is passed if the btype is "delete".
  const PostIcon = (btype, data) => {
    const currUser = firebase.auth().currentUser;
    var result = null
    if( btype == "like"){
        result = data.includes(currUser.displayName)
        ? (<Ionicons name="heart" size={20} color="red" />) 
        : (<Ionicons name="heart" size={20} color="grey" />)
    }else if ( btype == "hate"){
      result = (data.includes(currUser.display) 
      ? (<Ionicons name="heart-dislike" size={20} color="red" />)
      : ( <Ionicons name="heart-dislike" size={20} color="grey" />))
    } else if( btype == "delete"){
      result = (data == currUser.displayName
        ?(<Ionicons name="trash-outline" size={20} color="blue"/>)
        :(<Ionicons name="trash-outline" size={20} color="white"/>))
    }else{
      result = (<Ionicons name="chatbox" size={20} color="grey" />)
    }
    return result
  };

  const PostCard = ({
    postID,
    username,
    body,
    created_at,
    likes,
    hates,
    commentCount,
    liked,
    hated,
  }) => {
    const currUser = firebase.auth().currentUser;
    return (<Card
      flex
      style={{ margin: 10, padding: 5 }}
      onPress={() => viewPost(postID)}
    >
      <Card.Section
        content={[{ text: "@" + username, text70: true, red10: true }]}
        style={{
          padding: 10,
          flex: 1,
        }}
      />
      <Card.Section
        content={[{ text: body, text80: true, grey10: true }]}
        style={{
          padding: 10,
          flex: 1,
          margin: 10,
        }}
      />
      <Card.Section
        content={[{ text: created_at, text90: true, grey10: true }]}
        style={{
          padding: 10,
          flex: 1,
          margin: 10,
        }}
      />

      <View row left>
        <LikeButton likePost={likeAction} username={currUser.displayName} liked={liked} likeCount={likes} postID={postID}/>
        <Button
          onPress={() => hateAction(postID)}
          mode="text"
          icon={() => PostIcon("hate", hated)}
        >
          {hates}
        </Button>
        <Button
          onPress={() => viewPost(postID)}
          mode="text"
          icon={() => PostIcon("comment", null)}
        >
          {commentCount}
        </Button>
        <Button
          onPress={() => (
            username == currUser.displayName
              ? deleteAction(postID)
              : null
          )}
          mode="text"
          icon={() => PostIcon("delete", username)}
        ></Button>
      </View>
    </Card>
  );
  }

  //Getting all posts
  useEffect(() => {
    return firebase
      .firestore()
      .collection("posts")
      .orderBy("created_at", "desc")
      .onSnapshot(
        (snapshot) => {
          var posts = [];
          snapshot.forEach((doc) => {
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
          };
          posts.push(data);
        });
        setTransaction(posts);
      });
  }, []);

  const renderItem = ({ item }) => (
    <PostCard
      postID={item.id}
      username={item.username}
      body={item.body}
      created_at={item.created_at}
      likes={item.likes}
      hates={item.hates}
      commentCount={item.commentCount}
      liked={item.liked}
      hated={item.hated}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={transaction}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <FAB
        style={styles.fab}
        color={"#ffff"}
        small
        icon="plus"
        onPress={() => navigation.navigate("Create")}
      />
    </SafeAreaView>
  );
}
