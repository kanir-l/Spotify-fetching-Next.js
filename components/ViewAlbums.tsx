import { useRouter } from "next/router"

const ArtistAlbums = () => {
    const router = useRouter()

    return(
        <>
            <h1>{router.query.artistId}</h1>
        </>
    )
}

export default ArtistAlbums