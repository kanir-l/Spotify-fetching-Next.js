import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from '../../../../services/spotify';

type Data = {
  data: string
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  let tokenFromSS = String(req.query.token)
  let ACCESS_TOKEN: string = tokenFromSS

  try {
    if(!tokenFromSS) {
      ACCESS_TOKEN = tokenFromSS
    } else {
      const response = await getToken()
      const data = await response.json();
      ACCESS_TOKEN = data.access_token;
      res.status(200).json({ data: data.access_token })
    }
  } catch (error) {
    res.status(400)
  }
}
