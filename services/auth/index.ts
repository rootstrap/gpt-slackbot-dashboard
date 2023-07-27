import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth } from 'firebase/auth';

import { app } from '../firebaseConfig';

const auth = getAuth(app);

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
