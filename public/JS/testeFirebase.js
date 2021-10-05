// Import the functions you need from the SDKs you need
import { initializeApp } from "/node_modules/firebase/app";
import { getAnalytics } from "/node_modules/firebase/analytics";
import { getFirestore,doc, getDoc  } from "/node_modules/firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey           : "AIzaSyA1y4cFpPlS_aig6g7xIH1hPOchEYXl8DU",
  authDomain       : "sardinhaprojetos.firebaseapp.com",
  databaseURL      : "https://sardinhaprojetos-default-rtdb.firebaseio.com",
  projectId        : "sardinhaprojetos",
  storageBucket    : "sardinhaprojetos.appspot.com",
  messagingSenderId: "1051592867509",
  appId            : "1:1051592867509:web:bfef34f26a4cfd3cb688fc",
  measurementId    : "G-N8ZMRE6DD2"
};

// Initialize Firebase
const app       = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db        = getFirestore();

const docRef  = doc(db, "TesteSinais", "BAKEUSDT");
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}