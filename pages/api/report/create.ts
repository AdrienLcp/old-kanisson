import type { NextApiRequest, NextApiResponse } from 'next';
import { isLogged } from '../../../middlewares/isLogged';
import { v4 as uuidv4 } from 'uuid';
import db from '../../../lib/prisma';

export default isLogged(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const report = await db.report.create({
      data: {
        id: uuidv4(),
        ...req.body
      }
    });

    res.status(201).json(report);

  } catch (error){
    res.status(404).json(error);
  };
});