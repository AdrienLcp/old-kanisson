import type { NextApiRequest, NextApiResponse } from 'next';
import { isModerator } from '../../../middlewares/isModerator';
import db from '../../../lib/prisma';

export default isModerator(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const deletedReport = await db.report.delete({
      where: {
        id: req.body.id
      }
    });

    res.status(200).json(deletedReport);

  } catch (error){
    res.status(404).json(error);
  };
});