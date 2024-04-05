// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCg4-xB5Tp5DSZEsVlRpWMdBAGNrl2T7K8",
  authDomain: "fir-crypto-bbbfa.firebaseapp.com",
  projectId: "fir-crypto-bbbfa",
  storageBucket: "fir-crypto-bbbfa.appspot.com",
  messagingSenderId: "761785999230",
  appId: "1:761785999230:web:cafb7911bd87af30c71d2f"
};

// Initialize Firebase
// eslint-disable-next-line
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();