import Link from 'next/link';
import React, { ChangeEvent, useState } from 'react';
import { IArtists } from '../interfaces/spotify';
import Cookies from 'js-cookie';

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
  };

  const printSearchResults =
    searchResults.length > 0 &&
    searchResults.map((artist) => {
      return (
        <div className="searchresult-container" key={artist.id}>
          <Link href={`/artists/${artist.id}`}>{artist.name}</Link>
        </div>
      );
    });

  return (
    <div>
      <input type="text" placeholder="Search..." onChange={inputSearch} />
      {printSearchResults}
    </div>
  );
};

export default SearchArtists;
