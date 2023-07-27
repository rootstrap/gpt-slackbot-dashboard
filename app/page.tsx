'use client';
import * as React from 'react';
import Image from 'next/image';
import cn from 'classnames';

import { signInWithGoogle } from '@/services/auth';
import googleAuth from '@/public/icons/google-auth.svg';

const Home = () => {
	const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const credentials = await signInWithGoogle();
		console.log({ credentials });
	};

	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<form onSubmit={handleOnSubmit}>
				<button
					type='submit'
					className={cn(
						'flex rounded-md border-2 border-neutrals-300 bg-neutrals-white px-20 py-3 font-normal leading-6 text-neutrals-800 gap-2 items-center',
						'hover:bg-neutrals-100',
						'focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-primary-dark',
						'active:outline-none md:w-[360px]'
					)}
				>
					<Image src={googleAuth} alt='google-auth' width={20} height={20} />
					<p>Sign in with Google</p>
				</button>
			</form>
		</main>
	);
};

export default Home;
