'use client';

import React, { useState } from 'react';
import LightDarkBtn from './components/LightDarkBtn';
import SearchBox from './components/SearchBox';
import Image from 'next/image';
import Link from 'next/link';
import { IoLocationSharp } from 'react-icons/io5';
import { IoIosLink } from 'react-icons/io';
import { FaTwitter } from 'react-icons/fa';
import { BsBuildingsFill } from 'react-icons/bs';
import { useQuery } from 'react-query';
import dateFormat from 'dateformat';

interface GitHubUser {
  avatar_url: string;
  bio: string;
  blog: string | null;
  company: string | null;
  created_at: string; // Date and Time in ISO 8601 format
  email: string | null;
  events_url: string;
  followers: number;
  followers_url: string;
  following: number;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  hireable: boolean | null;
  html_url: string;
  id: number;
  location: string;
  login: string;
  name: string | null;
  node_id: string;
  organizations_url: string;
  public_gists: number;
  public_repos: number;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  twitter_username: string | null;
  type: string;
  updated_at: string; // Date and Time in ISO 8601 format
  url: string;
  documentation_url: string;
  message: string;
}

export default function Home() {
  const [userName, setUserName] = useState('mdfahim18');
  const { isLoading, error, data, refetch } = useQuery<GitHubUser>(
    'repoData',
    () =>
      fetch(`https://api.github.com/users/${userName}`).then((res) =>
        res.json()
      )
  );
  console.log(data);

  if (isLoading) {
    return (
      <div className='flex h-screen w-full items-center justify-center'>
        <p className='animate-bounce'>Loading</p>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    refetch();
  };
  return (
    <div className='flex min-h-screen w-full p-1.5 sm:p-4 pt-10 sm:pt-12 transition-all  dark:bg-slate-900 bg-stone-100'>
      <div className='mx-auto flex w-full max-w-[600px] flex-col gap-8 rounded p-2'>
        <section className='flex justify-between gap-3'>
          <p className='text-xl font-semibold'>Devfinder</p>
          <LightDarkBtn />
        </section>

        <section className='flex flex-col gap-6'>
          <SearchBox
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            onSubmit={handleSubmit}
          />
          {data?.message ? (
            <div className='flex w-full flex-col justify-center items-center gap-5 rounded-lg bg-white text-red-500 dark:bg-slate-800 px-4 py-8 min-h-[200px]'>
              {data?.message}
            </div>
          ) : (
            <main className='flex w-full flex-col gap-5 rounded-lg bg-white dark:bg-slate-800 px-4 py-8 min-h-[200px]'>
              <section className='flex gap-4'>
                <Image
                  src={data?.avatar_url ?? ''}
                  alt='profile'
                  width={200}
                  height={200}
                  className=' h-20 w-20 rounded-full'
                />
                <section className=' flex flex-col justify-between gap-1 transition-all sm:w-full sm:flex-row'>
                  <div>
                    <h1>{data?.name}</h1>
                    <Link
                      target='_blank'
                      href={`https://github.com/${data?.login}`}
                      className=' text-blue-500 hover:underline text-sm transition-all'
                    >
                      {data?.login}
                    </Link>
                  </div>
                  <p>
                    <span>Joined </span>
                    <span>{dateFormat(data?.created_at, 'dd mmm yyyy')}</span>
                  </p>
                </section>
              </section>

              <section className='flex flex-col gap-5'>
                <p>
                  {data?.bio ?? (
                    <span className=' opacity-60'>This profile has no bio</span>
                  )}
                </p>
                <div className=' flex justify-between gap-3 rounded-lg bg-stone-100 px-6 py-4 dark:bg-slate-900 min-h-[50px]'>
                  <div className='flex flex-col items-center gap-2'>
                    <p className='text-xs opacity-60'>Repos</p>
                    <p className='text-sm font-bold sm:text-base'>
                      {data?.public_repos}
                    </p>
                  </div>
                  <div className='flex flex-col items-center gap-2'>
                    <p className='text-xs opacity-60'>Folllowers</p>
                    <p className='text-sm font-bold sm:text-base'>
                      {data?.followers}
                    </p>
                  </div>
                  <div className='flex flex-col items-center gap-2'>
                    <p className='text-xs opacity-60'>Following</p>
                    <p className='text-sm font-bold sm:text-base'>
                      {data?.following}
                    </p>
                  </div>
                </div>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  <div className='flex items-center gap-2'>
                    <IoLocationSharp className='text-xl' />
                    <p>
                      {data?.location ?? (
                        <span className=' opacity-60'>Not Avilable</span>
                      )}
                    </p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <IoIosLink className='text-xl' />
                    <Link
                      title={data?.blog ?? ''}
                      href={data?.blog ?? ''}
                      className='hover:underline opacity-60 overflow-hidden max-w-[220px] text-ellipsis'
                    >
                      {data?.blog ?? (
                        <span className=' opacity-60'>Not Avilable</span>
                      )}
                    </Link>
                  </div>
                  <div className='flex items-center gap-2'>
                    <FaTwitter className='text-xl' />
                    <p>
                      {data?.twitter_username ?? (
                        <span className=' opacity-60'>Not Avilable</span>
                      )}
                    </p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <BsBuildingsFill className='text-xl' />
                    <p>
                      {data?.company ?? (
                        <span className=' opacity-60'>Not Avilable</span>
                      )}
                    </p>
                  </div>
                </div>
              </section>
            </main>
          )}
        </section>
      </div>
    </div>
  );
}
