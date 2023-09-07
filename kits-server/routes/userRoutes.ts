import express from 'express';
import { getFeeds } from '../logic/feed/getFeeds';
import { getUser } from '../logic/user/getUser';
import { validateToken } from '../logic/auth/tokenHandler';

const router = express.Router();

router.use(validateToken);

router.get('/', getUser);
router.get('/feeds', getFeeds);

export default router;