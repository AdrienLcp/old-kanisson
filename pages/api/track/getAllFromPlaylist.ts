import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/prisma';

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const tracks = await db.track.findMany({
      where: {
        playlist_id: req.body.playlist_id
      },
      orderBy: {
        youtube_title: 'desc'
      }
    });

    res.status(200).json(tracks);

  } catch (error){
    res.status(404).json(error);
  };
};