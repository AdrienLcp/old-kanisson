import type { NextApiRequest, NextApiResponse } from 'next';
import { checkBanishedUser } from '../../../middlewares/checkBanishedUser';
import db from '../../../lib/prisma';

export default checkBanishedUser(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {

    await db.playlist.deleteMany({
      where: {
        user_id: req.body.user_id
      }
    });

    const deletedUser = await db.user.delete({
      where: {
        id: req.body.user_id
      }
    });

    res.status(200).json(deletedUser);

  } catch(error) {
    res.status(404).json(error);
  };
});