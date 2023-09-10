import express from 'express';
import { register } from '../logic/auth/register';
import { login } from '../logic/auth/login';
import { adminLogin } from '../logic/auth/adminLogin';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/adminLogin', adminLogin);

export default router;