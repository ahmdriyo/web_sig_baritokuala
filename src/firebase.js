import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; 
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyBt4Q12r-ABBCk7XptnhTe68Uk9_qo9vHs",
  authDomain: "web-barito.firebaseapp.com",
  projectId: "web-barito",
  storageBucket: "web-barito.appspot.com",
  messagingSenderId: "221054702966",
  appId: "1:221054702966:web:81bda3a6e87feca27e9657"
};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
export { app,auth, firestore, storage};
