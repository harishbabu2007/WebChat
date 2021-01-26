import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDVgQrjv2a8XhE-ji638gi-1uAMKjtl2Lo",
  authDomain: "web-chat-bb872.firebaseapp.com",
  projectId: "web-chat-bb872",
  storageBucket: "web-chat-bb872.appspot.com",
  messagingSenderId: "345229271155",
  appId: "1:345229271155:web:de94b899a2f7426cdf4a06",
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const db = firebase.firestore();
