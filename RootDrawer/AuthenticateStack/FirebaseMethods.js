import firebase from "firebase";
import "firebase/firestore";
import {
  ToastMessage,
  ErrorAlert,
  LogError,
  LogInfo,
} from "../CommonComponents.js";
import * as Crypto from "expo-crypto";

const auth = () => {
  return firebase.auth();
};
const db = () => {
  return firebase.firestore();
};

export async function registration(username, email, password) {
  db()
    .collection("users")
    .doc(username)
    .get()
    .then((doc) => {
      if (doc.exists) {
        ErrorAlert("Username is taken.", "Please try another.");
      } else {
        auth()
          .createUserWithEmailAndPassword(email, password)
          .then((user) => {
           const currUser = auth().currentUser
		   currUser.updateProfile({
              displayName: username,
            }).then(()=>{
				currUser.sendEmailVerification()
              	.then(() => {
                	const accHash = userAccountHash(username, password);
                	ErrorAlert("Verification email was sent to " +
                    email +   ". Please verify your email to be get full access to your account.");

					db()
                  	.collection("users")
                  	.doc(username)
                  	.set({
						terpmail: email,
						username: username,
						accountHash: accHash.toString(),
						posts: [],
						comments: [],
						following: [],
						followers: [],
					})
					.then(() => {
						ToastMessage("User account successfully created!");
					})
					.catch((err) => {
						ErrorAlert("User was not saved!", err.message);
					});
				})
            })
            .catch((error) => {
				ErrorAlert("Error sending verification email.", error.message);
            });
        })
        .catch((err) => {
			ErrorAlert("Sign up failed! User was not created!", err.message);
        });
      }
    })
    .catch((err) => {
    	ErrorAlert(
        	"There is something wrong in reading db in signup!",
        	err.message
      	);
    });
}

export async function usernameExists(username) {
  db()
    .collection("users")
    .doc(username)
    .get()
    .then((doc) => {
      return doc.exists;
    })
    .catch((err) => {
      LogError("Error checking username!", err.message);
      return false;
    });
}

export async function signIn(name, password) {
  if (validateTerpmail(name)) {
    auth()
      .signInWithEmailAndPassword(name, password)
      .then((res) => {
        ToastMessage("Welcome " + res.user.displayName + "!");
      })
      .catch((err) => {
        ToastMessage("Sign in failed!");
        LogError("Sign in failed!", err.message);
      });
  } 
  
  if (validateUsername(name)) {
 	const isUser = usernameExists(name);
    if (isUser) {
      var data = null;

      db()
        .collection("users")
        .doc(name)
        .get()
        .then((doc) => {
          if (doc.exists) {
            data = {
              accountHash: doc.data().accountHash,
              terpmail: doc.data().terpmail,
            };
			const crypt = userAccountHash(name, password);
			if (data.accountHash == crypt) {
				auth()
			  	.signInWithEmailAndPassword(data.terpmail, password)
			  	.then(() => {
				  ToastMessage("Logged in");
				})
				.catch((err) => {
					ErrorAlert("Sign in failed!", err.message);
				});
			
			}else{
				ErrorAlert("Sign in failed!", "Incorrect password!");
			}
          }else{
			  ErrorAlert("User does not exist!", "We could not find a user with that username!");
		  }
        })
        .catch((err) => {
          ErrorAlert("Error checking username!", err.message);
        });
     
    } else {
      ToastMessage("User does not exist.");
    }
  } else {
    ErrorAlert(
      "Invalid username or email!",
      " username or email is formatted poorly."
    );
  }
}
//logout method
export async function logout() {
  auth()
    .signOut()
    .then(() => {
      ToastMessage("Logged out");
    })
    .catch((err) => {
      ErrorAlert("Something went wrong while signing you out!", err.message);
    });
}

//check if user verified their email address
export function userIsVerified() {
  const user = auth().currentUser;
  return user != null ? (user.emailVerified ? true : false) : false;
}

//removes spaces from string
export function removeSpaces(str) {
  return str.replace(/\s+/g, "");
}

//exported validation methods
export function validateTerpmail(e) {
  if (e == null || e.length == 0 || !e.includes("@terpmail.umd.edu")) {
    return false;
  }

  const arr = e.split("@");

  return arr.length != 2
    ? false
    : arr[0].length < 1
    ? false
    : arr[1] == "terpmail.umd.edu"
    ? true
    : false;
}

export function validateUsername(username) {
  return username == null
    ? false
    : /^[\w]{1,20}$/.test(username)
    ? true
    : false;
}

export function validatePassword(p) {
  return p == null ? false : /^[\w]{6,20}$/.test(p) ? true : false;
}

//Creates hash of password and username
export async function userAccountHash(username, password) {
  var code = username.toString() + password.toString();

  const result = await Crypto.digestStringAsync( Crypto.CryptoDigestAlgorithm.SHA256,code ).toString();
  return result;
}
