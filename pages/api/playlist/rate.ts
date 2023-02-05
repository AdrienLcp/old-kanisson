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
        id: req.body.playlist_id
      }
    });

    // Add new rating & new ID, then calcul new average rating for playlist
    const newRatings = [...playlist.ratings, req.body.rate];
    const newIDs = [...playlist.ratings_ids, req.body.user_id];
    let sum = 0;
    newRatings.map(rate => sum + rate);
    const newAverage = Math.ceil(sum / newRatings.length);

    // Update playlist with new data
    const rated = await db.playlist.update({
      where: {
        id: playlist.id
      },
      data: {
        average: newAverage,
        ratings: newRatings,
        ratings_ids: newIDs
      }
    });

    res.status(200).json(rated);

  } catch (error){
    res.status(404).json(error);
  };
}); 