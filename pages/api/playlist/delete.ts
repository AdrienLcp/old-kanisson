import type { NextApiRequest, NextApiResponse } from 'next';
import { checkUser } from '../../../middlewares/checkUser';
import db from '../../../lib/prisma';

export default checkUser(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {

    await db.track.deleteMany({
      where: {
        playlist_id: req.body.playlist_id
      }
    });

    const deletedPlaylist = await db.playlist.delete({
      where: {
        id: req.body.playlist_id
      }
    });

    res.status(200).json(deletedPlaylist);

  } catch (error){
    res.status(404).json(error);
  };
});