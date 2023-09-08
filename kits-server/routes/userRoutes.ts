import express from 'express';
import { getFeeds } from '../logic/feed/getFeeds';
import { getUser } from '../logic/user/getUser';
import { updateUser } from '../logic/user/updateUser';
import { getIsFollowing } from '../logic/user/getIsFollowing';
import { toggleFollow } from '../logic/user/toggleFollow';
import { searchUsers } from '../logic/user/searchUsers';
import { validateUserToken } from '../logic/auth/tokenHandler';
import { getUserFeatures } from '../logic/feature/getUserFeatures';

const router = express.Router();

router.use(validateUserToken);

router.get('/', getUser);
router.put('/', updateUser);
router.get('/search', searchUsers);
router.get('/following/:otherEmail', getIsFollowing);
router.put('/following/:otherEmail', toggleFollow);
router.get('/feeds', getFeeds);
router.get('/features', getUserFeatures);

export default router;