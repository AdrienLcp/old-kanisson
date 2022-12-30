import type { NextApiRequest, NextApiResponse } from 'next';
import { isModerator } from '../../../middlewares/isModerator';
import db from '../../../lib/prisma';

export default isModerator(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const reports = await db.report.findMany({
      orderBy: {
        date: 'asc'
      }
    });

    res.status(200).json(reports);

  } catch (error){
    res.status(404).json(error);
  };
});