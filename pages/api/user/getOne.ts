import type { NextApiRequest, NextApiResponse } from 'next';
import { checkUser } from '../../../middlewares/checkUser';
import db from '../../../lib/prisma';

export default checkUser(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const user = await db.user.findUnique({
      where: {
        id: req.body.user_id
      },
      select: {
        id: true,
        pseudo: true,
        date: true,
        moderator: true,
        admin: true,
        banned: true
      }
    });

    res.status(200).json(user);

  } catch (error){
    res.status(404).json(error);
  };
});