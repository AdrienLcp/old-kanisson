import type { NextApiRequest, NextApiResponse } from 'next';
import { isModerator } from '../../../middlewares/isModerator';
import { v4 as uuidv4 } from 'uuid';
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
        visible: !req.body.visible
      }
    });

    const newDate = new Date().toLocaleDateString();

    await db.notification.create({
      data: {
        id: uuidv4(),
        user_id: playlist.user_id,
        title: "Modération de playlist",
        message: `Votre playlist ${playlist.title} a été supprimée ou restaurée. Surveillez votre langage ou l'exactitude de vos questions/réponses`,
        date: newDate,
        seen: false
      }
    });

    res.status(200).json(playlist);

  } catch (error){
    res.status(404).json(error);
  };
}); 