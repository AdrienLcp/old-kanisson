import type { NextApiRequest, NextApiResponse } from 'next';
import { checkUser } from '../../../middlewares/checkUser';
import { Game } from '@prisma/client';
import db from '../../../lib/prisma';

export default checkUser(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const playedGame: Game = await db.game.create({
      data: {
        ...req.body
      }
    });

    res.status(201).json(playedGame);

  } catch (error){

    res.status(404).json(error);
  };
});