import { auth } from 'firebase-admin';
import { cookies } from 'next/dist/client/components/headers';
import { NextRequest, NextResponse } from 'next/server';

import { customInitializeApp } from '@/firebase/firebaseAdminConfig';

/* Initi Firebase Admin App once the server is called */
customInitializeApp();

const EXPIRATION_TIME = 60 * 60 * 24 * 5 * 1000;

/* Create Session in Firebase */
export const POST = async (req: NextRequest) => {
	const authorization = req.headers.get('Authorization');

	if (!authorization || !authorization.startsWith('Bearer '))
		return NextResponse.json({ ok: false, message: 'unauthorized' }, { status: 401 });

	const token = authorization.split('Bearer ')[1];
	const decodedToken = await auth().verifyIdToken(token);

	if (!decodedToken)
		return NextResponse.json({ ok: false, message: 'unauthorized' }, { status: 401 });

	const sessionCookie = await auth().createSessionCookie(token, {
		expiresIn: EXPIRATION_TIME,
	});

	const options = {
		name: 'session',
		value: sessionCookie,
		maxAge: EXPIRATION_TIME,
		httpOnly: true,
		secure: true,
	};

	//Add the cookie to the browser
	cookies().set(options);

	return NextResponse.json({ ok: true, message: 'authenticated' }, { status: 200 });
};

/* Check if the user is authenticated using the Firebase Session */
export const GET = async (req: NextRequest) => {
	const session = req.cookies.get('session')?.value;

	if (!session)
		return NextResponse.json({ ok: false, message: 'not-authenticated' }, { status: 401 });

	const decodedClaims = await auth().verifySessionCookie(session, true);

	if (!decodedClaims)
		return NextResponse.json({ ok: false, message: 'not-authenticated' }, { status: 401 });

	return NextResponse.json({ ok: true, message: 'authenticated' }, { status: 200 });
};
