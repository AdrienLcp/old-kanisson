import type { NextApiRequest, NextApiResponse } from 'next';
import { isModerator } from '../../../middlewares/isModerator';
import db from '../../../lib/prisma';

export default isModerator(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const playlists = await db.playlist.findMany({
      where: {
        visible: false,
        playable: true
      },
      orderBy: {
        date: 'desc'
      }
    });
    res.status(200).json(playlists);

  } catch (error){
    res.status(404).json(error);
  };
});