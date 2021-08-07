import firebase from 'firebase';
import 'firebase/firestore';
import { Alert } from 'react-native';
import React from 'react';

export async function registration(
	username,
	firstname,
	lastname,
	email,
	password,
	navigation
) {
	const db = firebase.firestore();

	db.collection('users')
		.doc(username)
		.get()
		.then((doc) => {
			if (doc.exists) {
				Alert.alert('username already being used my G');
			} else {
				firebase
					.auth()
					.createUserWithEmailAndPassword(email, password)
					.then((user) => {
						db.collection('users')
							.doc(username)
							.set({
								lastname: lastname,
								firstname: firstname,
								username: username,
								isTerp: false,
								terpmail: 'NA',
							})
							.then(() => {
								navigation.navigate('Home');
							})
							.catch((err) => {
								Alert.alert('Hmm signup failed bc a db messup');
								console.error(err.message);
							});
					})
					.catch((err) => {
						Alert.alert('Sign up failed in auth', err.message);
					});
				Alert.alert('Bet');
			}
		})
		.catch((err) => {
			Alert.alert(
				'there is something wrong in reading db in signup ',
				err.message
			);
		});
}

export async function signIn(email, password, navigation) {
	firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then((userCred) => {
			navigation.navigate('Profile');
			Alert.alert('Logged in');
		})
		.catch((err) => {
			Alert.alert('there is something wrong in login');
			console.log(err.message);
		});
}

export async function logout(navigation) {
	firebase
		.auth()
		.signOut()
		.then(() => {
			navigation.navigate('Login');
			Alert.alert('Logged out');
		})
		.catch((err) => {
			Alert.alert(err.message);
		});
}
