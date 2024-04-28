import React from 'react';
import { IoSearch } from 'react-icons/io5';

interface SearchProps {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}
const SearchBox = (props: SearchProps) => {
  return (
    <form
      onSubmit={props.onSubmit}
      className='flex items-center gap-2 w-full focus-within:ring-2 dark:focus-within:ring-gray-200 focus-within:ring-slate-800 shadow-md p-2 rounded-lg dark:bg-slate-800 bg-white'
    >
      <div className='flex w-full items-center h-full gap-2'>
        <IoSearch className=' text-2xl text-blue-500' />
        <input
          value={props.value}
          onChange={props.onChange}
          type='text'
          placeholder='Search github user name'
          className='w-full outline-none h-[40px] rounded bg-inherit p-1 text-sm'
          required
        />
      </div>
      <button
        type='submit'
        className=' rounded-lg bg-blue-500 px-5 py-2 text-white hover:opacity-80 transition-all'
      >
        Search
      </button>
    </form>
  );
};

export default SearchBox;
