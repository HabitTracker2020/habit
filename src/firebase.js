import firebase from "firebase";
const firebaseConfig = {
	apiKey: "AIzaSyAC4aOd6cZqUE74WQOVhYsialErQmc6FuU",
	authDomain: "ldrp-projekt-t20.firebaseapp.com",
	databaseURL: "https://ldrp-projekt-t20.firebaseio.com",
	projectId: "ldrp-projekt-t20",
	storageBucket: "ldrp-projekt-t20.appspot.com",
	messagingSenderId: "826292292139",
	appId: "1:826292292139:web:6f038100793d0538a7b86e",
	measurementId: "G-GG70NWSPD8"
};

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
//   db.settings({ host: "localhost:8080", ssl: false });

var functions = firebase.functions();
//   functions.useFunctionsEmulator("http://localhost:5001");

export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
export const GithubProvider = new firebase.auth.GithubAuthProvider();
export const auth = firebase.auth();
export { db, functions };
export default firebase;
