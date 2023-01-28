import type { NextApiRequest, NextApiResponse } from 'next';
import { isAdmin } from '../../../middlewares/isAdmin';
import db from '../../../lib/prisma';

export default isAdmin(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const tracks = await db.track.findMany();

    res.status(201).json(tracks);

  } catch (error){
    res.status(404).json(error);
  };
});