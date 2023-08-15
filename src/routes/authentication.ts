import express from 'express';
import { register, login } from '../controllers/auth';

export default function (router: express.Router) {
  router.post('/auth/register', register);
  router.post('/auth/login', login);
}
