import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import axios from 'axios';

function CollectionPage() {
  const [icons, setIcons] = useState<{ url?: string }[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getIcons() {
      setLoading(true);
      const { data } = await axios.get('/api/icons');
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
      {icons ? icons.map((icon, index) => (
        <div key={index} className='relative'>
          <img
            src={icon.url}
            alt='generated icon'
            className='w-[200px] h-[200px] object-center'
          />
          <Image
            onClick={() => downloadHandler(icon.url!)}
            src='/download.png'
            alt='download icon'
            width={24}
            height={24}
            className='absolute bottom-2 right-2 bg-white cursor-pointer'
          />
        </div>
      )): <p>You didnt genereta any icon yet</p>}
    </div>
  );
}

export default CollectionPage;
