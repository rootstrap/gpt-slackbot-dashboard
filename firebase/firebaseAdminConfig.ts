import { initializeApp, getApps, cert } from 'firebase-admin/app';
import path from 'path';

const certPath = path.join(__dirname, process.env.FIREBASE_KEYS_PATH || '');

const firebaseAdminConfig = {
	credential: cert(certPath),
};

export const customInitializeApp = () => {
	if (getApps().length <= 0) {
		initializeApp(firebaseAdminConfig);
	}
};
