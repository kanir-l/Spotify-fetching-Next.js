import type { NextApiRequest, NextApiResponse } from 'next'
import { getArtistsAlbums, getToken } from '../../../../services/spotify'

type Data = {
  data: []
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    let tokenFromSS = String(req.query.access_token)
    let ACCESS_TOKEN: string = tokenFromSS
    let artistId = String(req.query.albums)

    try {
        if(!tokenFromSS) {
            ACCESS_TOKEN = tokenFromSS 
        } else {
            const response = await getToken()
            const data = await response.json();
            ACCESS_TOKEN = data.access_token;
        }

        const response = await getArtistsAlbums(artistId, ACCESS_TOKEN)
        const albums = await response.json()
        res.status(200).json({data: albums.items})
    } catch (error) {
        res.status(400)
    }
}