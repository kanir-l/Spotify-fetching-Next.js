import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from '../../../../services/spotify';
import { setCookie } from '../../../../utils/cookies'

type Data = {
  data: string
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const response = await getToken()
    const data = await response.json();
    //Set the cookie, calls the function from the Utils/cookies
    setCookie(res, "spotifyToken", data.access_token, {
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: data.expires_in,
      httpOnly: true,
      path: '/',
    })
    res.status(200).json({ data: data.access_token })
  } 
  catch (error) {
    res.status(400)
  }
}
