
import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'




export function getPostComments ( postID )
{
	const listComments = []
    firebase.firestore().collection( 'posts' ).doc( postID ).collection( 'comments' ).orderBy( 'created_at', 'desc' ).get()
        .then( ( snapshot ) =>
        {
		    snapshot.forEach((doc) => {
			    listComments.push({ ...doc.data() })
	    	})
        } )
        .catch( err =>
        {
            Alert.alert( 'Getting Comments: ', err.message )
        } )
    return listComments
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
