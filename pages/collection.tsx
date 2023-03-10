import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import axios from 'axios';

function CollectionPage() {
  const [icons, setIcons] = useState<string[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
    async function getIcons() {
      setLoading(true);
      const { data } = await axios.get('/api/icons');
      if (data.length < 1) {
        setError('You didnt generate any icon yet!');
      }
      setIcons(data);
      setLoading(false);
    }

    getIcons();
  }, []);

  function downloadHandler(url: string) {
    saveAs(url, 'generated icon');
  }

  if (loading) return <p className='text-center animate-pulse'>Loading...</p>;

  return (
    <div className='flex p-2 md:pt-4 md:px-12 lg:px-16'>
      {icons?.map((icon, index) => (
        <div key={index} className='relative'>
          <img
            src={icon}
            alt='generated icon'
            className='w-[200px] h-[200px] object-center'
          />
          <Image
            onClick={() => downloadHandler(icon)}
            src='/download.png'
            alt='download icon'
            width={24}
            height={24}
            className='absolute bottom-2 right-2 bg-white cursor-pointer'
          />
        </div>
      ))}
      {error && <p>{error}</p>}
    </div>
  );
}

export default CollectionPage;
