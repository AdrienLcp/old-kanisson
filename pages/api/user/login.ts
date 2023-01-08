import type { NextApiRequest, NextApiResponse } from 'next';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import db from '../../../lib/prisma';

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const secret: any = process.env.JWT_SECRET;

  if(req.body.pseudoOrEmail.includes('@') && req.body.pseudoOrEmail.includes('.')) {
    try {
      const user: any = await db.user.findUnique({
        where: {
          email: req.body.pseudoOrEmail
        }
      });

      compare(req.body.password, user.password, async(err, result) => {
        if(!err && result) {

          let token: string;

          if(req.body.rememberMe) {
            token = sign(user, secret);
          } else {
            token = sign(user, secret, {expiresIn: '12h'});
          };

          res.status(200).json({user, token});
        } else {
          res.status(401).json({message: "Username & password doesn't match"});
        };
      });
    }
    catch(error){
      res.status(404).json({message: "Unknown user"});
    };

  } else {
    try {
      const user: any = await db.user.findUnique({
        where: {
          pseudo: req.body.pseudoOrEmail
        }
      });

      compare(req.body.password, user.password, async(err, result) => {
        if(!err && result) {

          let token: string;

          if(req.body.rememberMe) {
            token = sign(user, secret);
          } else {
            token = sign(user, secret, {expiresIn: '12h'});
          };

          res.status(200).json({user, token});
        } else {
          res.status(401).json({message: "Username & password doesn't match"});
        };
      });
    } catch(error){
      res.status(404).json({message: "Unknown user"});
    };
  };
};