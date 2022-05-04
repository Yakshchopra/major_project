// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAv6k0q2bq-QSr1TnzkQkynAEZ2CVF8d5c',
  authDomain: 'shuttle-v3.firebaseapp.com',
  projectId: 'shuttle-v3',
  storageBucket: 'shuttle-v3.appspot.com',
  messagingSenderId: '920616240575',
  appId: '1:920616240575:web:40ab98e501c6c305228d0a',
};

//bussesid: QfbsKAug2vhoC1W7Kn91

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInwithGoogle = () => {
  return signInWithPopup(auth, provider)
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
};

export const db = getDatabase(app);
