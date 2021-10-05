/**
 * npm install -g firebase-tools
 * npm install --save firebase
 * npm i firebase-admin --save
 */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
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
  measurementId    : "G-N8ZMRE6DD2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

const SignalsCollection       = "Sinais";
const ClosedSignalsCollection = "SinaisFechado";

const StPositionSignalsCollection       = "SinaisStPosition";
const ClosedStPositionSignalsCollection = "SinaisStPositionFechado";

const TestSignalsCollection                 = "TesteSinais";
const TestClosedSignalsCollection           = "TesteSinaisFechado";
const TestStPositionSignalsCollection       = "TesteSinaisStPosition";
const TestClosedStPositionSignalsCollection = "TesteSinaisStPositionFechado";

let signalsCollection                 = SignalsCollection;
let closedSignalsCollection           = ClosedSignalsCollection;
let signalsStPositionCollection       = StPositionSignalsCollection;
let closedStPositionSignalsCollection = ClosedStPositionSignalsCollection;

let testMode = false;

var callbackOnPairAdded;
var callbackOnPairModified;
var callbackOnPairRemoved;

var callbackOnStPositionPairAdded;
var callbackOnStPositionPairModified;
var callbackOnStPositionPairRemoved;

function getCollectionDocumentsIds(collectionName) {
  let documentsIds = [];
  db.collection(collectionName)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((document) => {
        documentsIds.push(document.id);
      });
      return buildSuccessDictionary(documentsIds);
    })
    .catch((error) => {
      return buildErrorDictionary(error);
    });
}

function readCollectionDocument(collectionName, documentId) {
  var docRef = db.collection(collectionName).doc(documentId);

  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        const documentData = doc.data();
        console.log("Document data:", documentData);
        return buildSuccessDictionary(documentData);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
      return buildErrorDictionary(error);
    });
}

function buildSuccessDictionary(data) {
  return {
    status: true,
    data  : data,
  };
}

function buildErrorDictionary(errorMessage) {
  return {
    status: false,
    error : errorMessage,
  };
}

module.exports = {
  getCollectionDocumentsIds      : getCollectionDocumentsIds,
  readCollectionDocument         : readCollectionDocument,
  SignalsCollection              : SignalsCollection,
  StPositionSignalsCollection    : StPositionSignalsCollection,
  TestSignalsCollection          : TestSignalsCollection,
  TestStPositionSignalsCollection: TestStPositionSignalsCollection,
};
