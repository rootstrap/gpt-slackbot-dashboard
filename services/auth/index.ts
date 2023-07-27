import {
	//Firebase Auth
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	getAuth,
	//Google Auth
	GoogleAuthProvider,
	signInWithPopup,
} from 'firebase/auth';

import { app } from '../firebaseConfig';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

/* Functions to handle auth with email and password */
export const signUpWithEmailAndPassword = async (email: string, password: string) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		return userCredential;
	} catch (error) {
		return error;
	}
};

export const loginInWithEmailAndPassword = async (email: string, password: string) => {
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		return userCredential;
	} catch (error) {
		return error;
	}
};

/* Functions to handle auth with google */
export const signInWithGoogle = async () => {
	try {
		const userCredential = await signInWithPopup(auth, googleProvider);
		return userCredential;
	} catch (error) {
		return error;
	}
};
