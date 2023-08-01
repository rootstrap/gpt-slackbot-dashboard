import * as React from 'react';

import { LoginForm } from '@/app/components/LoginForm';

const Home = () => {
	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<LoginForm />
		</main>
	);
};

export default Home;
