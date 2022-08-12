import type { NextPage } from 'next'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useState } from 'react';
import flatten from 'lodash.flatten';
const Home: NextPage = () => {
  const { data: session } = useSession();
  const [genres, setGenres] = useState([]);
  const [title, setTitle] = useState('');
  const getMyTopTracks = async () => {
    const res = await fetch('api/tracks');
    const { items } = await res.json();
    console.log(items);
    const gen = items.map(item => {
      return item.genres;
    })
    const flatGen = flatten(gen);
    console.log(flatGen);
    setGenres(flatGen);
    setTitle('Here are your favorite genres you weirdo:')
  }


  if (session) {
    return (
      <div className='flex flex-col justify-center w-screen'>
        <p className='text-center'>Signed in</p>
        <hr />
        <button className='text-pink-400 text-2xl' onClick={() => getMyTopTracks()}>Click here to run insanely goated algorithm</button>
        <h1 className='text-center text-cyan-300 text-3xl'>{title}</h1>
        {genres.map((genre, i) => (
          < div className='flex flex-col justify-between items-center' key={i} >
            <p className='text-center text-xl'>{genre}</p>
          </div>
        ))
        }
        <button onClick={() => signOut()}>Sign Out</button>
      </div >
    )
  }
  return (
    <div className='flex flex-col justify-center w-screen h-screen'>
      <button onClick={() => signIn()}>Log in to your spotify to enter! </button>
    </div>
  )
}

export default Home
