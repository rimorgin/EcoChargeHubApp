import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence, browserSessionPersistence } from 'firebase/auth'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyDHM8Y7mMgwG7PP6k7vikKMzmGYJNwz5xM",
    authDomain: "ecochargehub.firebaseapp.com",
    projectId: "ecochargehub",
    storageBucket: "ecochargehub.appspot.com",
    messagingSenderId: "212064033238",
    appId: "1:212064033238:web:e772e0b966d199ba2f6c77",
    measurementId: "G-D5PTXZ7WGD"
  };

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

