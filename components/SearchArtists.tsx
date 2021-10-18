import Link from 'next/link';
import React, { ChangeEvent, useState } from 'react';
import { IArtists } from '../interfaces/spotify';
import Cookies from 'js-cookie';
import styles from './SearchArtist.module.scss';


const SearchArtists = () => {
  const [searchResults, setSearchResults] = useState<IArtists[]>([]);

  const inputSearch = (e: ChangeEvent<HTMLInputElement>) => {
    //Get cookie on the client side
    const tokenFromCookie = Cookies.get('spotifyToken');

    if (!tokenFromCookie) {
      fetch(`/api/spotify/auth/token`).then(() => {
        fetch(`/api/spotify/artists/${e.target.value}`)
          .then((response) => response.json())
          .then((data) => {
            const searchData = data.data;
            setSearchResults(searchData);
          });
      });
    } else {
      fetch(`/api/spotify/artists/${e.target.value}`)
        .then((response) => response.json())
        .then((data) => {
          const searchData = data.data;
          setSearchResults(searchData);
        });
    }
  }

  const printSearchResults =
    searchResults.length > 0 &&
    searchResults.map((artist) => {
      return (
        <ul className="bg-white opacity-80% margin-xs padding-left-md padding-right-md radius-md width-80%" key={artist.id}>
          <Link href={`/artists/${artist.id}?artist_name=${artist.name}`}>
            <li className="font-bold padding-xs flex justify-start flex-center justify-between">
              {artist.images[2] && <img className="margin-right-lg width-xxl height-xxl object-cover radius-50%" src={artist.images[2].url} />}
              {artist.name} <br/>
            </li>
          </Link>
        </ul>
      )
    }) 

  return (
    <>
      <section className= {styles.backgroundImg}>
        <div className="flex flex-column flex-center padding-top-xxl padding-bottom-xl">
            <div className="flex flex-center flex-between margin-bottom-xs">
              <h1 className = "font-bold text-md text-uppercase color-white padding-right-xs">Artist Search</h1>
              <p className="text-xs color-white padding-right-xs">by</p>
              <img className = {styles.spotifylogo} src="/Spotify_Icon_RGB_Green.png" />
            </div>

            <input className= "form-control font-light width-xxxxl radius-full padding-xs margin-xs opacity-80%" type="text" name="input-name" id="input-name" required placeholder="Search..." onChange={inputSearch} />
        </div>

        <div className="flex flex-column flex-center radius-lg">
          {printSearchResults} 
        </div>
      </section>
    </>
  );
};

export default SearchArtists;