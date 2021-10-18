import type { NextPage } from 'next'
import Head from 'next/head'


import React from 'react'
import SearchArtists from '../components/SearchArtists'

const Home: NextPage = () => {

  return (
    <div>
      <Head>
        <title>Search the Artist</title>
      </Head>

      <main>
        <SearchArtists></SearchArtists>
      </main>
    </div>
  )
}

export default Home


