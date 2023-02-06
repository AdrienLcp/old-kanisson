import type { NextApiRequest, NextApiResponse } from 'next';
import { isModerator } from '../../../middlewares/isModerator';
import db from '../../../lib/prisma';

export default isModerator(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const user = await db.user.update({
      where: {
        id: req.body.user_id
      },
      data: {
        banned: req.body.banned,
        moderator: req.body.moderator
      }
    });

    if(user.banned) {
      await db.playlist.updateMany({
        where: {
          user_id: user.id
        },
        data: {
          visible: false
        }
      });
    };

    res.status(200).json(user);

  } catch (error){
    res.status(404).json(error);
  };
});