import firebase from 'firebase';
import 'firebase/firestore';
import { Alert } from 'react-native';

const Blurb = (title, message) => {Alert.alert(title, message)};
export async function registration(
	username,
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
						firebase.auth().currentUser.updateProfile({	displayName: username})
						firebase.auth().currentUser.sendEmailVerification().then(() => {
							Alert.alert('Verification email was sent to ' + email, "Please verify your email to be get full access to your account.");
						})
						const uid = firebase.auth().currentUser.uid
						db.collection('users')
							.doc(uid)
							.set({
								terpmail: email,
								username: username,
								posts: [],
								comments:[],
								following: [],
								followers: []
							})
							.then(() => {
								Alert.alert('User successfully created and saved to Firebase');
							})
							.catch((err) => {
								Alert.alert('Mess up in saving user to firebase: ', err.message);
								console.error(err.message);
							});
					})
					.catch((err) => {
						Alert.alert('Sign up failed in auth', err.message);
						console.error(err.message);
					});
				Alert.alert('Welcome to LowKeyUMD');
			}
		})
		.catch((err) => {
			Alert.alert('there is something wrong in reading db in signup',	err.message);
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
			Alert.alert('Logged out');
			console.log("Succesfully logged out")
		})
		.catch((err) => {
			Alert.alert('Something went wrong while signing you out!', err.message);
			console.log("SIGNOUT: " + err.message.toString());
		});
}

const validUsername = /^[a-zA-Z0-9_]{1,20}$/;

export function removeSpaces(str) {
	return str.replace(/\s+/g, '');
}

export function validateTerpmail(email) {
	if(email == null  || email===""){
		Blurb("Terpmail is required", "Please enter a valid TERPmail address");
		return false;
	}
	const emailSplit = email.split('@');
	if (emailSplit[1] !== 'terpmail.umd.edu') {
		Blurb("Invalid TERPmail","Your TERPmail is your UMD gmail ending with \"@terpmail.umd.edu\". Please enter a valid TERPmail address");
		return false;
	}

	return true;
}
export function validateUsername(username) {
	const u = removeSpaces(username);
	if (u.length > 0) {
		var result = username.match(validUsername);
		return (result != null && result.length > 0 && result.length < 21) ?  true : false;
		
	}else{

	}
	Alert.alert(
		'username must at least 1 character long, at most 20 characters long, only consist of a-z, A-Z, and/or 0-9.'
	);
	return false;
}

