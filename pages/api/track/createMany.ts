import type { NextApiRequest, NextApiResponse } from 'next';
import { isLogged } from '../../../middlewares/isLogged';
import db from '../../../lib/prisma';

export default isLogged(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await db.track.deleteMany({
      where: {
        playlist_id: req.body[0].playlist_id
      }
    });

    const tracks = await db.track.createMany({
      data: [
        ...req.body
      ]
    });

    res.status(200).json(tracks);

  } catch (error){
    res.status(404).json(error);
  };
});