import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"

interface IAlbums {
    name: string
    id: string
}[]

const ArtistAlbums = () => {
    const router = useRouter()
    const artistId = router.query.artistId
    const artistName = router.query.artist_name

    let defaultResults: IAlbums[] = []
    const [artistsAlbums, setArtistsAlbums] = useState(defaultResults)

    useEffect(() => {
        const tokenFromSS = sessionStorage.getItem('myToken')
        if (!tokenFromSS) {
            fetch(`/api/spotify/auth/${tokenFromSS}`)
                .then(response => response.json())
                .then(data => {
                    sessionStorage.setItem('myToken', data.data)
            })
        }

        fetch(`/api/spotify/albums/${artistId}?access_token=${tokenFromSS}`)
        .then(response => response.json())
        .then(data => {
            const albums = data.data
            setArtistsAlbums(albums)
        }) 
    }, [])

    const printAlbums = artistsAlbums.map((album) => {
        return (
            <div className = "searchresult-container" key={album.id}>
                    <div>{album.name}</div> 
            </div> 
        )
    })    

    return(
        <>
            <h1>{artistName}</h1>
            {printAlbums} 
        </>
    )
}

export default ArtistAlbums 