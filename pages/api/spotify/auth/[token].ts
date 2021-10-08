import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from '../../../../services/spotify';

type Data = {
  data: string
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  let ACCESS_TOKEN: string = ""

  try {
    if(!ACCESS_TOKEN) {
      const response = await getToken()
      const data = await response.json();
      ACCESS_TOKEN = data.access_token;
      res.status(200).json({ data: ACCESS_TOKEN })
    }
  } catch (error) {
    res.status(400)
  }
}
