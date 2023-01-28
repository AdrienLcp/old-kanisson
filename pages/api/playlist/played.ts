import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/prisma';

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const playlist: any = await db.playlist.findUnique({
      where: {
        id: req.body.playlist_id
      }
    });

    const newNbOfPlayed = playlist?.nbOfPlayed + 1;

    await db.playlist.update({
      where: {
        id: req.body.playlist_id
      },
      data: {
        nbOfPlayed: newNbOfPlayed
      }
    });

    res.status(200);

  } catch (error){
    res.status(404).json(error);
  };
};