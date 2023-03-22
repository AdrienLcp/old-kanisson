import type { NextApiRequest, NextApiResponse } from 'next';
import { checkUser } from '../../../middlewares/checkUser';
import db from '../../../lib/prisma';

export default checkUser(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let newRatings = [...req.body.ratings];
    let newIDs = [...req.body.ratings_ids];

    // If user already rated this playlist
    if(req.body.ratings_ids.includes(req.body.user_id)) {
      // Find index of his ID
      const index = req.body.ratings_ids.findIndex((id: string) => id === req.body.user_id);

      // To find & update his previous rate
      newRatings[index] = req.body.rate;

    } else {
      newRatings.push(req.body.rate);
      newIDs.push(req.body.user_id);
    };

    // Calculate new average of the playlist
    let sum = 0;
    newRatings.forEach(rate => sum = sum + rate);
    const newAverage = Math.ceil(sum / newRatings.length);

    // Update playlist with new data
    const ratedPlaylist = await db.playlist.update({
      where: {
        id: req.body.playlist_id
      },
      data: {
        average: newAverage,
        ratings: newRatings,
        ratings_ids: newIDs
      }
    });

    res.status(200).json(ratedPlaylist);

  } catch (error){
    res.status(404).json(error);
  };
}); 