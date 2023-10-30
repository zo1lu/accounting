import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: "accounting-app-5a53c.firebaseapp.com",
    projectId: "accounting-app-5a53c",
    storageBucket: "accounting-app-5a53c.appspot.com",
    messagingSenderId: "643366989709",
    appId: "1:643366989709:web:4bea81eb22dc06feac57c4",
    measurementId: "G-3935GL4W7D"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

function logout(){
    signOut(auth)
    .then(() => {
        console.log("click log out button")
    })
    .catch((error) => {
        console.log(error)
    });
}

function onAuthStateChange(callback){
    return onAuthStateChanged(auth, (user) => {
    if (user) {
        // console.log(user)
        // console.log("login")
        callback({uid: user.uid, email:user.email})
    } else {
        // console.log("Logout")
        callback(()=>{return {uid:"", email:""}})
    }
});
}

export {app, db, auth, logout, onAuthStateChange}