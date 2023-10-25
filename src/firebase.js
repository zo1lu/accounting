import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.API_Key,
    authDomain: "accounting-app-5a53c.firebaseapp.com",
    projectId: "accounting-app-5a53c",
    storageBucket: "accounting-app-5a53c.appspot.com",
    messagingSenderId: "643366989709",
    appId: "1:643366989709:web:4bea81eb22dc06feac57c4",
    measurementId: "G-3935GL4W7D"
};

const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const db = getFirestore(app);