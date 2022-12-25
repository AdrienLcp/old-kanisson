import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { isLogged } from '../../../middlewares/isLogged';
import db from '../../../lib/prisma';

export default isLogged(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const playlistCreated = await db.playlist.create({
      data: {
        id: uuidv4(),
        ...req.body
      }
    });

    res.status(201).json(playlistCreated);

  } catch (error){
    res.status(404).json(error);
  };
});