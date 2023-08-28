// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCIg1W6zDdmT5DGdFuf5yathPPnwl-QYJY',
  authDomain: 'react-notes-21822.firebaseapp.com',
  projectId: 'react-notes-21822',
  storageBucket: 'react-notes-21822.appspot.com',
  messagingSenderId: '17908913199',
  appId: '1:17908913199:web:cce44ca7e732f983b6e2da',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const notesCollection = collection(db, 'notes');
