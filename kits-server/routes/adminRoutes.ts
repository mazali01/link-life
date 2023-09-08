import express from 'express';
import { validateAdminToken } from '../logic/auth/tokenHandler';
import { getUsers } from '../logic/user/getUsers';
import { getAdminFeatures } from '../logic/feature/getAdminFeatures';
import { toggleFeature } from '../logic/feature/toggleFeature';
import { removeUser } from '../logic/user/removeUser';

const router = express.Router();

router.use(validateAdminToken);


router.get('/features', getAdminFeatures);
router.put('/features', toggleFeature);
router.get('/users', getUsers);
router.delete('/users', removeUser);

export default router;