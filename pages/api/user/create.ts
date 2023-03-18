import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import db from '../../../lib/prisma';
import { User } from '@prisma/client';

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const secret: any = process.env.JWT_SECRET;

  hash(req.body.password, 12, async(err, hash) => {

    if(err) {
      res.status(404).json(err);
    } else {

      try {
        const user: User = await db.user.create({
          data: {
            id: uuidv4(),
            pseudo: req.body.pseudo,
            email: req.body.email,
            date: new Date().toLocaleDateString(),
            iso_date: new Date().toISOString(),
            password: hash
          }
        });

        let token: string;

        if(req.body.rememberMe) {
          token = sign(user, secret);
        } else {
          token = sign(user, secret, {expiresIn: '12h'});
        };

        res.status(201).json({user, token});

      } catch (error){
        res.status(404).json(error);

        console.log(error);
      };
    };
  });
};