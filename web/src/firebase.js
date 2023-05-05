import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBiwGMmkzDuPycUZueEAboRuuiX1bRoY_4",
    authDomain: "mini-game-c5600.firebaseapp.com",
    projectId: "mini-game-c5600",
    storageBucket: "mini-game-c5600.appspot.com",
    messagingSenderId: "380013718002",
    appId: "1:380013718002:web:ddd5d5552edf60c733a36b",
    measurementId: "G-VM2QHYW6R0"
  };

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export { auth };
