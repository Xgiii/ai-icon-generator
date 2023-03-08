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
  const [selectedColor, setSelectedColor] = useState('Blue');
  const [selectedStyle, setSelectedStyle] = useState('metalic');
  const [selectedShape, setSelectedShape] = useState('circular');

  return (
    <section className='flex flex-col items-start mx-auto space-y-4 max-w-[60%] p-16'>
      <h1 className='font-bold text-4xl mb-12'>Let's generate your icon!</h1>
      <div className='flex flex-col space-y-4'>
        <h2 className='text-2xl'>
          1. Describe your icon using a noun and adjective
        </h2>
        <input
          type='text'
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
        <h2 className='text-2xl'>4. Select the shape of your icon</h2>
        <div className='flex space-x-2'>
          {shapes.map((shape, index): any => (
            <RadioButton
              radioGroup='shapes'
              selected={selectedShape}
              onSelect={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSelectedShape(e.target.value)
              }
              label={shape}
              key={index}
            />
          ))}
        </div>
      </div>

      <div className='flex flex-col space-y-4'>
        <h2 className='text-2xl'>
          5. How many images do you want (1 credit per image)
        </h2>
        <input
          type='number'
          value={1}
          className='bg-transparent ring-2 ring-cyan-500 outline-none rounded-md p-2 w-full'
        />
        <button className='px-6 py-2 bg-blue-400 text-gray-800 font-semibold rounded-md uppercase'>
          Generate
        </button>
      </div>
    </section>
  );
}

export default GeneratePage;
