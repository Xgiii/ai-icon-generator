import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>AI Icon Generator</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='absolute top-[40%] left-[50%] -translate-x-[50%] text-center'>
        <h1 className='text-4xl'>Generate icons in seconds!</h1>
        <div className='mt-4'>
          <Link
            href='/generate'
            className='px-6 py-3 bg-blue-400 text-gray-800 font-semibold rounded-md uppercase'
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
