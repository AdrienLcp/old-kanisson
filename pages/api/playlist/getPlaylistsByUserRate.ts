import type { NextApiRequest, NextApiResponse } from 'next';
import type { Playlist } from '@prisma/client';
import { checkUser } from '../../../middlewares/checkUser';
import db from '../../../lib/prisma';

export default checkUser(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const playlists = await db.playlist.findMany({
      where: {
        visible: true
      },
      orderBy: [{
        average: 'desc'
      }]
    });

    const playlistsRatedByUser = [] as Playlist[];

    playlists.map(playlist => {
      if(playlist.ratings_ids.includes(req.body.user_id)) playlistsRatedByUser.push(playlist);
    });

    res.status(200).json(playlistsRatedByUser);

  } catch (error){
    res.status(404).json(error);
  };
});