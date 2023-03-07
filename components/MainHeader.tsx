import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

function MainHeader() {
  const router = useRouter();
  const user = null;

  return (
    <div className='flex items-center justify-between p-2 md:pt-4 md:px-12 lg:px-16'>
      <ul className='flex items-center space-x-12'>
        <h1 onClick={() => router.push('/')} className='font-bold text-2xl cursor-pointer'>
          AI Icon Generator
        </h1>
        <li>
          <Link href='/generate'>Generate</Link>
        </li>
        {user && (
          <li>
            <Link href='/collection'>Collection</Link>
          </li>
        )}
      </ul>
      <button className='px-6 py-2 bg-gray-800 text-gray-400 font-semibold rounded-md uppercase'>
        Sign In
      </button>
    </div>
  );
}

export default MainHeader;
