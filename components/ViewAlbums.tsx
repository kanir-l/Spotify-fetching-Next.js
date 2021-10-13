import { IAlbum } from "../interfaces/spotify"

interface Props {
    artistAlbums: IAlbum[]
}

const ArtistAlbums = ( props: Props ) => {

    /* const router = useRouter()
    const artistId = router.query.artistId

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
 */

    const printAlbums = props.artistAlbums.map((album) => {
        return (
            <div className = "searchresult-container" key={album.id}>
                <div>{album.name}</div> 
            </div> 
        )
    })     

    return(
        <> 
            {printAlbums}  
        </>
    )
}

export default ArtistAlbums

