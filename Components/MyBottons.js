import React from 'react'
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-paper";


const LikeIcon = (currentUsername, liked) => (
        liked.includes(currentUsername)
        ? <Ionicons name="heart" size={20} color="red" /> 
        : <Ionicons name="heart" size={20} color="grey" />
    )


const HateIcon = (currentUsername, hated) =>  (
        hated.includes(currentUsername)
        ? <Ionicons name="heart-dislike" size={20} color="red" /> 
        : <Ionicons name="heart-dislike" size={20} color="grey" />
    )

const CommentIcon = () =>(
     <Ionicons name="chatbox" size={20} color="grey" />
)

const DeleteIcon = (currentUsername, postAuthorUsername) =>  {
    return(
    postAuthorUsername == currUsername
    ?<Ionicons name="trash-outline" size={20} color="blue"/>
    :<Ionicons name="trash-outline" size={20} color="white"/>
    )
}


export function DeleteButton({
    postID, 
    username, 
    postAuthor, 
    deletePost}){
        return (
        <Button
        onPress={() => deletePost(postID)}
        icon={() => DeleteIcon(username, postAuthor)}
        mode="text">
        </Button>
    )
}


export function HateButton({
    postID, 
    username, 
    hated, 
    hatePost}){
        return (
            <Button
            onPress={() => hatePost(postID)}
            icon={() => HateIcon(username, hated)}
            mode="text"
            >{hated.length()}</Button>
        )
}

export function LikeButton({
    postID, 
    username, 
    liked, 
    likePost,
    likeCount}){
        return (
            <Button 
            onPress={() => likePost(postID)}
            icon={() => LikeIcon(username, liked)}
            mode="text"
            >{likeCount}</Button>
        )
}


export function CommentButton({
    postID, 
    commentCount, 
    commentAction}){
        return(
            <Button
            onPress={()=>commentAction(postID)}
            icon={()=> CommentIcon()}
            mode="text"
            >{commentCount}</Button>
        )
}
