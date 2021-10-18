import { GetServerSideProps, NextPage } from "next"

import React from "react"
import ViewAlbums from "../../components/ViewAlbums"
import { IAlbums } from "../../interfaces/spotify"
import { getArtistsAlbums } from "../../services/spotify"

interface Props {
    artistName: string,
    artistAlbums: IAlbums[],
}

const artist: NextPage<Props> = ( {artistAlbums, artistName, artistImage} ) => {
    return(
        <ViewAlbums artistAlbums={artistAlbums} artistName={artistName} artistImage={artistImage}></ViewAlbums>
    )
}

export default artist

export const getServerSideProps: GetServerSideProps = async (context) => {
    const artistName = String(context.query.artist_name)
    const artistId = String(context.query.artistId)
    const tokenFromCookies = String(context.req.cookies.spotifyToken)

    const response = await getArtistsAlbums(artistId, tokenFromCookies)
    const data = await response.json()
    const artistAlbums = data.items

    /* const response = await fetch(`http://localhost:3000/api/spotify/albums/${artistId}?access_token=${tokenFromCookies}`)
    const data = await response.json()
    const artistAlbums = data.data */  

   return {
        props: {
            artistName: artistName,
            artistAlbums: artistAlbums  
        }
    }
}
