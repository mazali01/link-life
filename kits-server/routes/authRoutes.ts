import express from 'express';
import { register } from '../logic/auth/register';
import { login } from '../logic/auth/login';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;