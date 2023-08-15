import express from 'express';
import { get, merge } from 'lodash';
import { getUserBySessionToken } from '../models/users';

const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies['SESSION-TOKEN'];

    if (!sessionToken) {
      return res.sendStatus(403);
    }

    const user = await getUserBySessionToken(sessionToken);

    if (!user) {
      return res.sendStatus(403);
    }

    merge(req, { identity: user });

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, 'identity._id')! as string;

    console.dir(id);
    console.dir(req);

    if (!currentUserId) {
      return res.sendStatus(403);
    }

    if (currentUserId.toString() !== id) {
      return res.sendStatus(403);
    }

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export { isAuthenticated, isOwner };
