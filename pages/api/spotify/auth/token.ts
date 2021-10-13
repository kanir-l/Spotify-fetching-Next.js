import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from '../../../../services/spotify';
import { setCookie } from '../../../../utils/cookies'

type Data = {
  access_token?: string
  error?: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const response = await getToken()
    const data = await response.json();
    //Set the cookie, calls the function from the Utils/cookies
    setCookie(res, 'spotifyToken', data.access_token, {
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: data.expires_in * 1000, // expires_in is set in seconds so we multiply it by 1000 to get it into milliseconds
      httpOnly: process.env.NODE_ENV === 'production',
      path: '/',
    });
    res.status(200).json({ access_token: data.access_token });
  } 
  catch (error) {
    res.status(400).json({ error: 'Something went wrong' })
  }
}

export default handler
