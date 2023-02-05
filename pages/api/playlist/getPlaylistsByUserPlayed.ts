import type { NextApiRequest, NextApiResponse } from 'next';
import { checkUser } from '../../../middlewares/checkUser';
import db from '../../../lib/prisma';

export default checkUser(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const played = await db.game.findMany({
      where: {
        user_id: req.body.user_id
      }
    });

    const playlistsPlayedByUser = [] as any[];

    played.map(async(game) => {
      const newPlaylist = await db.playlist.findMany({
        where: {
          id: game.playlist_id,
          visible: true,
          playable: true
        }
      });

      playlistsPlayedByUser.push(newPlaylist);
    });

    res.status(200).json(playlistsPlayedByUser);

  } catch (error){
    res.status(404).json(error);
  };
});