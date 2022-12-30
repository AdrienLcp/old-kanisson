import type { NextApiRequest, NextApiResponse } from 'next';
import { checkUser } from '../../../middlewares/checkUser';
import db from '../../../lib/prisma';

export default checkUser(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const deletedQuiz = await db.playlist.delete({
      where: {
        id: req.body.quiz_id
      }
    });

    res.status(200).json(deletedQuiz);

  } catch (error){
    res.status(404).json(error);
  };
});