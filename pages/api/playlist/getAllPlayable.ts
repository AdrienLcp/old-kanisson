import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/prisma';

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const playlists = await db.playlist.findMany({
      where: {
        visible: true,
        playable: true
      },
      orderBy: {
        iso_date: 'desc'
      }
    });
    res.status(200).json(playlists);

  } catch (error){
    res.status(404).json(error);
  };
};