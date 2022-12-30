import type { NextApiRequest, NextApiResponse } from 'next';
import { checkUser } from '../../../middlewares/checkUser';
import db from '../../../lib/prisma';

export default checkUser(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const playlist: any = await db.playlist.findUnique({
      where: {
        id: req.body.playlist
      }
    });

    const newRate = [...playlist.rate, req.body.user_rate];
    const newIDs = [...playlist.rates_IDs, req.body.user_id];

    const rated = await db.playlist.update({
      where: {
        id: playlist.id
      },
      data: {
        ratings: newRate,
        ratings_ids: newIDs
      }
    });

    res.status(200).json(rated);

  } catch (error){
    res.status(404).json(error);
  };
}); 