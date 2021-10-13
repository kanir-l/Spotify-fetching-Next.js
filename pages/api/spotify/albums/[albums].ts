import type { NextApiRequest, NextApiResponse } from 'next';
import { getArtistsAlbums } from '../../../../services/spotify';

type Data = {
  data?: [];
  error?: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    
    if (!req.cookies?.spotifyToken) {
      throw new Error('You have to supply the spotify token');
    }

    const artistId = String(req.query.albums);
    const access_token = req.cookies.spotifyToken;

    const response = await getArtistsAlbums(artistId, access_token);
    const albums = await response.json();
    res.status(200).json({ data: albums.items });
  } catch (error) {
    res.status(400).json({ error: 'Something went wrong' });
  }
};

export default handler;
