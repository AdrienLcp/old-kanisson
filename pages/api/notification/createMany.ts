import type { NextApiRequest, NextApiResponse } from 'next';
import { isModerator } from '../../../middlewares/isModerator';
import { Notification } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';
import db from '../../../lib/prisma';

export default isModerator(async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const messages: Notification[] = [];
    const users = await db.user.findMany();

    // for each user found
    users.forEach(user => {
      // set new message with data received
      const message: any = {
        id: uuidv4(),
        user_id: user.id,
        title: req.body.title,
        message: req.body.message,
        date: new Date().toDateString(),
        seen: false
      };

      messages.push(message);
    });

    const notifications = await db.notification.createMany({
      data: [
        ...messages
      ],
      skipDuplicates: false
    });

    res.status(201).json(notifications);

  } catch (error){
    res.status(404).json(error);
  };
});