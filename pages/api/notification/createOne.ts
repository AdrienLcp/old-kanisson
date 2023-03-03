import type { NextApiRequest, NextApiResponse } from 'next';
import { isModerator } from '../../../middlewares/isModerator';
import { v4 as uuidv4 } from 'uuid';
import db from '../../../lib/prisma';

export default isModerator(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const notification = await db.notification.create({
      data: {
        id: uuidv4(),
        date: new Date().toISOString(),
        ...req.body
      }
    });

    res.status(201).json(notification);

  } catch (error){
    res.status(404).json(error);
  };
});