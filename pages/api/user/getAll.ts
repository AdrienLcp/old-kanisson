import type { NextApiRequest, NextApiResponse } from 'next';
import { isModerator } from '../../../middlewares/isModerator';
import db from '../../../lib/prisma';

export default isModerator(async function getAllUsers (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const users = await db.user.findMany({
      select: {
        pseudo: true,
        date: true,
        moderator: true,
        admin: true,
        banned: true
      },
      orderBy: {
        iso_date: 'desc'
      }
    });

    res.status(200).json(users);

  } catch (error){
    res.status(404).json(error);
  };
});