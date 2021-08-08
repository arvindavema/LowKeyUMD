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
				'there is something wrong in reading db in signup ',
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
		})
		.catch((err) => {
			Alert.alert('Something went wrong while signing you out!', err.message);
		});
}

const validUsername = /^[a-zA-Z0-9_]{1,20}$/;

export function removeSpaces(str) {
	return str.replace(/\s+/g, '');
}

export function validateTerpmail(e) {
	if (
		(e != null && e[0] != '' && e[1] == 'terpmail.umd.edu') ||
		e[1] == 'umd.edu'
	) {
		return true;
	}

	Alert.alert(
		'Your terpmail is your @terpmail.umd.edu OR your @umd.edu email if youre a staff member.'
	);
	return false;
}
export function validateUsername(username) {
	u = removeSpaces(username);
	if (u != null && username != '') {
		result = username.match(validUsername);
		if (result != null && result[0] != null) {
			return true;
		}
	}
	Alert.alert(
		'username must at least 1 character long, at most 20 characters long, only consist of a-z, A-Z, and/or 0-9.'
	);
	return false;
}
