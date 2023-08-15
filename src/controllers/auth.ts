import express from 'express';
import bcrypt from 'bcrypt';
import { createUser, getUserByEmail } from '../models/users';

const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.sendStatus(400);
    }

    const existsUser = await getUserByEmail(email);
    if (existsUser) {
      return res.sendStatus(400);
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await createUser({
      email,
      username,
      password: hashPassword,
      sessionToken: undefined,
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await getUserByEmail(email).select('+password');

    if (!user) {
      return res.sendStatus(400);
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.sendStatus(403);
    }

    user.sessionToken = await bcrypt.genSalt(10);
    await user.save();

    res.cookie('SESSION-TOKEN', user.sessionToken);

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export { register, login };
