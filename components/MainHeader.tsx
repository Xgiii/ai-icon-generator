import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

function MainHeader() {
  const router = useRouter();
  const { data: session } = useSession();
  
  return (
    <div className='flex items-center justify-between p-2 md:pt-4 md:px-12 lg:px-16'>
      <ul className='flex items-center space-x-12'>
        <h1
          onClick={() => router.push('/')}
          className='font-bold text-2xl cursor-pointer'
        >
          AI Icon Generator
        </h1>
        <li>
          <Link href='/generate'>Generate</Link>
        </li>
        {session?.user && (
          <li>
            <Link href='/collection'>Collection</Link>
          </li>
        )}
      </ul>
      <div className='flex items-center space-x-3'>
        {!session?.user && (
          <button
            onClick={() => signIn('google')}
            className='px-6 py-2 bg-gray-800 text-gray-400 font-semibold rounded-md uppercase'
          >
            Sign In
          </button>
        )}
        {session?.user && (
          <>
            <p>999 credits left</p>
            <button className='px-6 py-2 bg-blue-400 text-gray-800 font-semibold rounded-md uppercase'>
              Buy Credits
            </button>
            <button
              onClick={() => signOut()}
              className='px-6 py-2 bg-gray-800 text-gray-400 font-semibold rounded-md uppercase'
            >
              Sign Out
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default MainHeader;
