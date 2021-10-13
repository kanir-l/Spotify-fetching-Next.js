import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import React from "react"
import ViewAlbums from "../../components/ViewAlbums"
import { IAlbum } from "../../interfaces/spotify"
import { getArtistsAlbums } from "../../services/spotify"

interface Props {
    artistId: string
    artistAlbums: IAlbum[],
}

const artist: NextPage<Props> = ( {artistAlbums} ) => {
    return(
        <ViewAlbums artistAlbums={artistAlbums}></ViewAlbums>
    )
}

export default artist

/* export const getServerSideProps: GetServerSideProps = async (context) => {
    const artistId = String(context.query.artistId)
    const tokenFromCookies = String(context.req.cookies.spotifyToken)

    const response = await getArtistsAlbums(artistId, tokenFromCookies)
    const data = await response.json()
    const artistAlbums = data.items

    /*const response = await fetch(`http://localhost:3000/api/spotify/albums/${artistId}?access_token=${tokenFromCookies}`)
            const data = await response.json()
            const artistAlbums = data.data  */

   /*  return {
        props: {
            artistAlbums: artistAlbums,
            tokenFromCookies: tokenFromCookies
            
        }
    } */
}  */