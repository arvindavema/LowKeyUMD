import firebase from 'firebase';

const firebaseConfig = {
	apiKey: 'AIzaSyBQgyXXJUpLxQuhyIJ8GuH-J9f2v8Q7dDY',
	authDomain: 'collegemarket.firebaseapp.com',
	projectId: 'collegemarket',
	storageBucket: 'collegemarket.appspot.com',
	messagingSenderId: '960227739745',
	appId: '1:960227739745:web:cdc9a43cdd0845335d0220',
	measurementId: 'G-S2HDPKHDJP',
};

const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;
