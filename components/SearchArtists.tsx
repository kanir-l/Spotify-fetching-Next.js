import Link from 'next/link'
import React, { ChangeEvent, useEffect, useState } from 'react'

interface IArtists {
    name: string,
    id: string
}[]

const SearchArtists = () => {
    let defaultResults: IArtists[] = []
    const [searchResults, setSearchResults] = useState(defaultResults)

    useEffect(() => {
        setTimeout(() => { sessionStorage.clear() }, (1000 * 60 * 60));
    }, [])
   
    const inputSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const tokenFromSS = sessionStorage.getItem('myToken')
        if (!tokenFromSS) {
            fetch(`/api/spotify/auth/${tokenFromSS}`)
                .then(response => response.json())
                .then(data => {
                    sessionStorage.setItem('myToken', data.data)
            })
        }

        fetch(`/api/spotify/artists/${e.target.value}?access_token=${tokenFromSS}`)
            .then(response => response.json())
            .then(data => {
                const searchData = data.data
                setSearchResults(searchData)
        })
    }
 
    const printSearchResults = searchResults.map((artist) => {
        return (
            <div className = "searchresult-container" key={artist.id}>
                    <Link href = {`/artists/${artist.id}?artist_name=${artist.name}`}>
                        {artist.name}
                    </Link> 
            </div> 
        )
    })  
    
    return (
        <div>
            <input type='text' placeholder="Search..." onChange={inputSearch} /> 
            {printSearchResults}
        </div>
    )
}

/* export const getServerSideProps: GetServerSideProps = async () => {
    const res = await fetch(`http://localhost:3000/api/artists/artists`)
    const data = await res.json()
  
    return {
      props: {
        artists: data
      }
    }
} */
  

export default SearchArtists