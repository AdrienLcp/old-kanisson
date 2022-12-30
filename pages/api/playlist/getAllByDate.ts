import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/prisma';

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const quizz = await db.playlist.findMany({
      where: {
        visible: true
      },
      orderBy: [{
        date: 'desc'
      }]
    });
    res.status(200).json(quizz);

  } catch (error){
    res.status(404).json(error);
  };
};