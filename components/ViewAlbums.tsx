import { IAlbums } from "../interfaces/spotify"
import styles from './ViewAlbums.module.scss';

interface Props {
    artistName: string,
    artistImage: img,
    artistAlbums: IAlbums[]
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
                <ul className="width-90% bg-black opacity-80% padding-lg margin-xs radius-lg flex justify-center justify-between flex-center" key={album.id}>
                    <li className="color-white">Album: {album.name}</li> 
                    <li>Release Date: {album.release_date}</li> 
                    <li>Total Tracks: {album.total_tracks}</li> 
                    <div>{album.images[2] && <img className="margin-right-lg object-contain" src={album.images[2].url}/>}</div>
                </ul> 
        )
    })     

    return(
        <> 
            <section className={styles.backgroundImg}>
                <div className={styles.nameBackground}>
                    <h1 className="color-white font-bold">
                        {props.artistName}
                    </h1>
                </div>
               
                <div className="flex flex-column justify-center flex-center">
                    {printAlbums}
                </div>  
            </section>
        </>
    )
}

export default ArtistAlbums

