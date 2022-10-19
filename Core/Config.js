import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBAgg5lKItnlGL3atmkHurfslL0-23aJFs",
    authDomain: "ac2mobile-b5738.firebaseapp.com",
    projectId: "ac2mobile-b5738",
    storageBucket: "ac2mobile-b5738.appspot.com",
    messagingSenderId: "244913983965",
    appId: "1:244913983965:web:18fbc0b700cdaaa742a634"
};

export const app = initializeApp(firebaseConfig);
// Firestore Reference
export const db = getFirestore(app);