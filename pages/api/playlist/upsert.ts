import type { NextApiRequest, NextApiResponse } from 'next';
import { checkUser } from '../../../middlewares/checkUser';
import db from '../../../lib/prisma';

export default checkUser(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const playlist = await db.playlist.upsert({
      where: {
        id: req.body.id
      },
      update: {
        title: req.body.title,
        description: req.body.description
      },
      create: {
        ...req.body,
        date: new Date().toLocaleDateString()
      }
    });

    res.status(200).json(playlist);

  } catch (error){
    res.status(404).json(error);
  };
});