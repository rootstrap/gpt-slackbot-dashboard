import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/* Handle route protection */
export const middleware = async (req: NextRequest) => {
	const session = req.cookies.get('session')?.value;

	if (!session) return NextResponse.redirect(new URL('/', req.nextUrl));

	const response = await fetch(`${req.nextUrl.origin}/api/auth`, {
		method: 'GET',
		headers: {
			Cookie: `session=${session}`,
		},
	});

	if (response.status !== 200) return NextResponse.redirect(new URL('/', req.nextUrl));

	if (response.status === 200 && req.nextUrl.pathname === '/')
		return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
};

/* List of routes to run the middleware*/
export const config = {
	matcher: ['/', '/dashboard/:path*'],
};
