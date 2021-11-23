import firebase from 'firebase';
import 'firebase/firestore';
import { Alert } from 'react-native';

export async function registration(
	username,
	firstname,
	lastname,
	email,
	password
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
						firebase.auth().currentUser.updateProfile({
							displayName: username
						})
						var uid = firebase.auth().currentUser.uid
						db.collection('users')
							.doc(uid)
							.set({
								lastname: lastname,
								firstname: firstname,
								username: username,
								terpmail: email,
								posts: []
							})
							.then(() => {
								alert('User successfully created');
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
				'there is something wrong in reading db in signup ' + err.message.toString(),
				err.message
			);
		});
}

export async function signIn(email, password) {
	firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then((userCred) => {
			Alert.alert('Logged in');
		})
		.catch((err) => {
			Alert.alert('there is something wrong in login');
			console.log(err.message);
		});
}

export async function logout() {
	firebase
		.auth()
		.signOut()
		.then(() => {
			Alert.alert('You are logged out');
			console.log("Succesfully logged out")
		})
		.catch((err) => {
			Alert.alert('Something went wrong while signing you out!');
			console.log("SIGNOUT: " +err.message.toString());
		
		});
}

const validUsername = /^[a-zA-Z0-9_]{1,20}$/;

export function removeSpaces(str) {
	return str.replace(/\s+/g, '');
}

export function validateTerpmail(email) {
	if (
		( email !== null && email[1] === 'terpmail.umd.edu')
	) {
		return true;
	}

	Alert.alert(
		'Your TERPmail is your @terpmail.umd.edu. You need to use this email to gain accesss.'
	);
	return false;
}
export function validateUsername(username) {
	const u = removeSpaces(username.toString());
	if (u !== '') {
		var result = username.match(validUsername);
		if (result != null && result.length > 0 && result.length < 21) {
			return true;
		}
	}
	Alert.alert(
		'username must at least 1 character long, at most 20 characters long, only consist of a-z, A-Z, and/or 0-9.'
	);
	return false;
}

