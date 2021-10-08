import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from 'react'
import SearchArtists from '../components/SearchArtists'

const Home: NextPage = () => {

  return (
    <div className={styles.container}>
      <Head>
        <title>Search the Artist</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Spotify Artists Search</h1>
        <SearchArtists></SearchArtists>
      </main>
    </div>
  )
}

export default Home


