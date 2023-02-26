import type { NextApiRequest, NextApiResponse } from 'next';
import type { Game } from '@prisma/client';
import db from '../../../lib/prisma';

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const playedGames: Game[] = await db.game.findMany({
      where: {
        pseudo: req.body.pseudo
      }
    });

    res.status(200).json(playedGames);

  } catch (error){

    res.status(404).json(error);
  };
};