import type { NextApiRequest, NextApiResponse } from 'next'
import { getSearchResults, getToken } from '../../../../services/spotify'

type Data = {
  data: []
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    let tokenFromSS = String(req.query.access_token)
    let ACCESS_TOKEN: string = tokenFromSS
    let searchTerm = String(req.query.artists)

    try {
        if(!tokenFromSS) {
            ACCESS_TOKEN = tokenFromSS 
        } else {
            const response = await getToken()
            const data = await response.json();
            ACCESS_TOKEN = data.access_token;
        }

        const response = await getSearchResults(searchTerm, ACCESS_TOKEN)
        const artists = await response.json()
        res.status(200).json({data: artists.artists.items})
    } catch (error) {
        res.status(400)
    }
}