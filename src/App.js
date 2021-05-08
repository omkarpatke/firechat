import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import './App.css';
import Button from './components/Button';
import Channel from './components/Channel';

import { useState, useEffect } from 'react';

firebase.initializeApp({
    apiKey: "AIzaSyBn_NkLv_VrZVhGHCCEwVTHbpxIsU8eRdg",
    authDomain: "react-firechat-8fc31.firebaseapp.com",
    projectId: "react-firechat-8fc31",
    storageBucket: "react-firechat-8fc31.appspot.com",
    messagingSenderId: "409282799246",
    appId: "1:409282799246:web:2aab85ffb4ee0f9c474bdf"
});

const auth = firebase.auth();
const db = firebase.firestore();

function App() {
    const [user, setUser] = useState(() => auth.currentUser);
    const [initializing, setInitializing] = useState(true);
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            if (initializing) {
                setInitializing(false);
            }
        });

        return unsubscribe;

    }, []);
    const signInWithGoogle = async() => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.useDeviceLanguage();
        try {
            await auth.signInWithPopup(provider);
        } catch (error) {
            console.error(error);
        }
    }

    const signOut = async() => {
        try {
            await firebase.auth().signOut();
        } catch (error) {
            console.log(error.message);
        }
    }

    if (initializing) return 'Loading ...';
    return ( <
        div > {
            user ? ( < >
                <
                Button onClick = { signOut }
                className = "signOutBtn" > Sign out < /Button> <
                Channel user = { user }
                db = { db }
                /> < / >
            ) : ( < Button onClick = { signInWithGoogle }



                    className = "signInBtn" > Sign in with Google < /Button>)
                } <
                /div>
        );
    }

    export default App;