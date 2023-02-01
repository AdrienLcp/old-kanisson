import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/prisma';

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {

    const playlists = await db.playlist.findMany({
      where: {
        visible: true
      }
    });

    // Randomize order in array
    for(let i = playlists.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = playlists[i];
      playlists[i] = playlists[j];
      playlists[j] = temp;
    };

    res.status(200).json(playlists);

  } catch (error){
    res.status(404).json(error);
  };
};