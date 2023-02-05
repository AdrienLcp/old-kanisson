import type { NextApiRequest, NextApiResponse } from 'next';
import { isModerator } from '../../../middlewares/isModerator';
import db from '../../../lib/prisma';

export default isModerator(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const playlist = await db.playlist.update({
      where: {
        id: req.body.playlist_id
      },
      data: {
        visible: req.body.visible
      }
    });

    res.status(200).json(playlist);

  } catch (error){
    res.status(404).json(error);
  };
}); 