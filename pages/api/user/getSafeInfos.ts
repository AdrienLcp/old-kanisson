import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/prisma';

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const user = await db.user.findUnique({
      where: {
        pseudo: req.body.pseudo
      },
      select: {
        id: true,
        pseudo: true,
        date: true,
        moderator: true,
        banned: true
      }
    });

    res.status(200).json(user);

  } catch (error){
    res.status(404).json(error);
  };
};