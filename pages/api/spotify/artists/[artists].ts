import type { NextApiRequest, NextApiResponse } from 'next'
import { getSearchResults, getToken } from '../../../../services/spotify'

type Data = {
  data?: []
  error?: string
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
        console.log(req.cookies)
        if (!req.cookies?.spotifyToken) {
            throw new Error("You have to supply the spotify token")
        }
    
        //Get cookie in the Api
        let tokenFromCookie = req.cookies?.spotifyToken
        let searchTerm = String(req.query.artists)

        const response = await getSearchResults(searchTerm, tokenFromCookie)
        const artists = await response.json()
        res.status(200).json({data: artists.artists.items})
    } 
    catch (error) {
        res.status(400).json({error: "Something went wrong"})
    }
}