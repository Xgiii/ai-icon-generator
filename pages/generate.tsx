import axios from 'axios';
import { saveAs } from 'file-saver';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useState } from 'react';
import RadioButton from '../components/RadioButton';

const colors = [
  'Blue',
  'Red',
  'Orange',
  'Purple',
  'Yellow',
  'Pink',
  'Cyan',
  'Green',
  'Teal',
  'White',
  'Black',
];

const styles = [
  'metalic',
  'polygon',
  'pixelated',
  'clay',
  'gradient',
  'illustrated',
];

const shapes = ['circular', 'rounded', 'square'];

function GeneratePage() {
  const [prompt, setPrompt] = useState('');
  const [n, setN] = useState('1');
  const [selectedColor, setSelectedColor] = useState('Blue');
  const [selectedStyle, setSelectedStyle] = useState('metalic');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [images, setImages] = useState<{ url?: string }[]>([]);

  const { status } = useSession();

  async function generateIconHandler() {
    setError('');
    if (prompt.trim().length < 5) {
      setError('Type prompt');
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.post('/api/generate', {
        prompt,
        n,
        color: selectedColor,
        style: selectedStyle,
      });
      setImages((prevState) => [...prevState, ...data.data]);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  }

  function downloadHandler(url: string) {
    saveAs(url, 'generated icon');
  }

  return (
    <section className='flex flex-col items-start mx-auto space-y-4 max-w-[60%] p-16'>
      <h1 className='font-bold text-4xl mb-12'>Let's generate your icon!</h1>
      <div className='flex flex-col space-y-4'>
        <h2 className='text-2xl'>
          1. Describe your icon using a noun and adjective
        </h2>
        <input
          type='text'
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder='an angry chicken'
          className='bg-transparent ring-2 ring-cyan-500 outline-none rounded-md p-2 w-full'
        />
      </div>
      <div className='flex flex-col space-y-4'>
        <h2 className='text-2xl'>2. Select a primary color for your icon</h2>
        <div className='flex space-x-2'>
          {colors.map((color, index): any => (
            <RadioButton
              radioGroup='colors'
              selected={selectedColor}
              onSelect={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSelectedColor(e.target.value)
              }
              key={index}
              label={color}
            />
          ))}
        </div>
      </div>

      <div className='flex flex-col space-y-4'>
        <h2 className='text-2xl'>3. Select a style for your icon</h2>
        <div className='flex space-x-2'>
          {styles.map((style, index): any => (
            <RadioButton
              radioGroup='styles'
              selected={selectedStyle}
              onSelect={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSelectedStyle(e.target.value)
              }
              label={style}
              key={index}
            />
          ))}
        </div>
      </div>

      <div className='flex flex-col space-y-4'>
        <h2 className='text-2xl'>4. How many images do you want</h2>
        <input
          type='number'
          onChange={(e) => setN(e.target.value)}
          value={n}
          className='bg-transparent ring-2 ring-cyan-500 outline-none rounded-md p-2 w-[34vw]'
        />
        <button
          onClick={generateIconHandler}
          className={`px-6 py-2 bg-blue-400 text-gray-800 font-semibold rounded-md uppercase disabled:bg-blue-300 ${
            loading && 'animate-pulse'
          }`}
          disabled={status === 'unauthenticated'}
        >
          {!loading && status === 'authenticated' && 'Generate'}
          {!loading &&
            status === 'unauthenticated' &&
            'sign in to generate icon'}
          {loading && 'Generating...'}
        </button>
        <p className='text-red-600 italic font-bold'>{error}</p>
      </div>

      <div className='flex flex-wrap'>
        {images.map((image, index) => (
          <div key={index} className='relative'>
            <img
              src={image.url}
              alt='generated icon'
              className='w-[200px] h-[200px] object-center'
            />
            <Image
              onClick={() => downloadHandler(image.url!)}
              src='/download.png'
              alt='download icon'
              width={24}
              height={24}
              className='absolute bottom-2 right-2 bg-white cursor-pointer'
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default GeneratePage;
