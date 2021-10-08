import type { NextApiRequest, NextApiResponse } from 'next'
import { getSearchResults, getToken } from '../../../services/spotify';


type Data = {
  data: []
}



export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  let ACCESS_TOKEN: string = ""
  let tokenFromSS = req.query.access_token

  //let ACCESS_TOKEN: string = ""

  //If there is no token from SS, response 401
   try {
        if(!tokenFromSS) {
            ACCESS_TOKEN = tokenFromSS
        } else {
            const response = await getToken()
            const data = await response.json();
            ACCESS_TOKEN = data.access_token;
        }

        const searchTerm = String(req.query.search)

        const response = await getSearchResults(searchTerm, ACCESS_TOKEN)
        const artists = await response.json()
        res.status(200).json({data: artists.artists.items})
    } catch (error) {
        res.status(400)
    }
}