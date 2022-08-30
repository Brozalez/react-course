import { initializeApp } from "firebase/app";

import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword, 
    signInUserWithEmailAndPassword
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB34V7HgLIxPUSj_Ow9v23FyxAx4R4cU18",
    authDomain: "crwn-clothes-db-7df0f.firebaseapp.com",
    projectId: "crwn-clothes-db-7df0f",
    storageBucket: "crwn-clothes-db-7df0f.appspot.com",
    messagingSenderId: "915569373319",
    appId: "1:915569373319:web:6801a034533b13ad1dc822"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider); 
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentfromAuth = async (userAuth, additionalInformation = {displayName: 'mike'}) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid ) 

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date ();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt, 
                ...additionalInformation,
            });

        } catch (error) {
            console.log('error creating the user',error.message )
        }
    }

    return userDocRef;

}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInUserWithEmailAndPassword(auth, email, password);
}