import express from 'express';
import { validateUserToken } from '../logic/auth/tokenHandler';
import { updatePostLike } from '../logic/post/updatePostLike';
import { addComment } from '../logic/post/addComment';
import { publishPost } from '../logic/post/publishPost';
import { deletePost } from '../logic/post/deletePost';
import { deleteComment } from '../logic/post/deleteComment';

const router = express.Router();

router.use(validateUserToken);

router.post('/', publishPost);
router.put('/:postId/like', updatePostLike);
router.post('/:postId/comment', addComment);
router.delete('/:postId', deletePost);
router.delete('/:postId/comment/:commentId', deleteComment);

export default router;