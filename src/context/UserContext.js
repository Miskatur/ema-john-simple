import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import app from '../firebase/firebase.init';
export const AuthContext = createContext();


const auth = getAuth(app)

const UserContext = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);


    const createUser = (email, password) => {
        setLoading(true);

        return createUserWithEmailAndPassword(auth, email, password)
    }

    const userSignIn = (email, password) => {

        setLoading(true);

        return signInWithEmailAndPassword(auth, email, password)
    }
    const userSignOut = () => {

        setLoading(true);

        return signOut(auth)
    }
    const googleProvider = new GoogleAuthProvider()

    const signInWithGoogle = () => {
        setLoading(true);

        return signInWithPopup(auth, googleProvider)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            // console.log("current user state changed :", currentUser)
            setUser(currentUser);

            setLoading(false);

        });

        return () => unSubscribe()
    }, [])




    const authInfo = { user, createUser, userSignIn, userSignOut, loading, signInWithGoogle }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;