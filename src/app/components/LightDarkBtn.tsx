'use client';
import { useTheme } from 'next-themes';
import React from 'react';
import { IoSunnyOutline } from 'react-icons/io5';
import { LuMoonStar } from 'react-icons/lu';

export default function LightDarkBtn() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleDark = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  };
  return (
    <div className='flex items-center gap-2'>
      <p className='text-sm'>{resolvedTheme === 'light' ? 'DARK' : 'LIGHT'}</p>

      <button onClick={toggleDark} className='text-2xl'>
        {resolvedTheme === 'light' ? <LuMoonStar /> : <IoSunnyOutline />}
      </button>
    </div>
  );
}
