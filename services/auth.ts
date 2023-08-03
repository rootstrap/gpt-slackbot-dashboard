import {
	//Firebase Auth
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	getAuth,
	signOut,
	//Google Auth
	GoogleAuthProvider,
	signInWithPopup,
	UserCredential,
} from 'firebase/auth';

import { app } from '@/firebase/firebaseAppConfig';

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
export const signInWithGoogle = async (): Promise<UserCredential> => {
	try {
		const userCredential = await signInWithPopup(auth, googleProvider);
		const email = userCredential.user.email;

		if (email?.endsWith('@rootstrap.com')) {
			await signOut(auth);
		}

		return userCredential;
	} catch (error) {
		throw new Error(JSON.stringify(error));
	}
};

export const getCurrentUser = () => {
	return auth.currentUser;
};
