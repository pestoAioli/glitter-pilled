import type { NextPage } from 'next'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useState } from 'react';
import { getTopTracks } from '../lib/spotify';


const Home: NextPage = () => {
  const { data: session } = useSession();
  const [tracks, setTracks] = useState([]);

  const getMyTopTracks = async () => {
    const res = await fetch('api/tracks');
    const { items } = await res.json();
    setTracks(items);
  }


  if (session) {
    return (
      <div className='flex flex-col justify-center w-screen'>
        <p className='text-center'>Signed in</p>
        <hr />
        <button className='text-orange-900 text-2xl' onClick={() => getMyTopTracks()}>Beware False Renunciates</button>
        {tracks.map((track) => (
          <div className='flex flex-col justify-between items-center' key={track.id}>
            <h1 className='text-center'>{track.name}</h1>
            <picture>
              <img src={track.images[0].url} alt='picture' className='w-40' />
            </picture>
          </div>
        ))}
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    )
  }
  return (
    <div className='flex flex-col justify-center w-screen h-screen'>
      <button onClick={() => signIn()}>Log in to your spotify to enter </button>
    </div>
  )
}

export default Home
