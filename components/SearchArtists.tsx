import Link from 'next/link'
import React, { ChangeEvent, useState } from 'react'
import { IArtists } from '../interfaces/spotify'
import Cookies from 'js-cookie'

const SearchArtists = () => {
    let defaultResults: IArtists[] = []
    const [searchResults, setSearchResults] = useState(defaultResults)
   
    const inputSearch = (e: ChangeEvent<HTMLInputElement>) => {
        //Get cookie on the client side, install an extra js-cookie package
        const tokenFromCookie = Cookies.get("spotifyToken")
        console.log("tokenFromCookie", tokenFromCookie)
        if (!tokenFromCookie) {
            fetch(`/api/spotify/auth/token`)   
            .then( () => {
                fetch(`/api/spotify/artists/${e.target.value}`)
                .then(response => response.json())
                .then(data => {
                const searchData = data.data
                setSearchResults(searchData)
                })
            })  
        } else {
            fetch(`/api/spotify/artists/${e.target.value}`)
                .then(response => response.json())
                .then(data => {
                const searchData = data.data
                setSearchResults(searchData)
                })
        }
    }
 
    const printSearchResults = searchResults.map((artist) => {
        return (
            <div className = "searchresult-container" key={artist.id}>
                    <Link href = {`/artists/${artist.id}`}>
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


  

export default SearchArtists