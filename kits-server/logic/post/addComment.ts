import { postDal } from "../../fileDB/post";
import { v4 as uuidv4 } from 'uuid';

export const addComment = async (req, res) => {
  const userEmail = req.payload.email;
  const postId = req.params.postId;
  const comment = req.body.comment;

  if (!comment) {
    res.status(400);
    res.send("Comment is required");
    return;
  }

  const post = await postDal.findOne({ id: postId });

  if (!post) {
    res.status(404);
    res.send("Post not found");
    return;
  }

  await postDal.update(p => p.id === postId, post => ({
    ...post,
    comments: [...post.comments, {
      id: uuidv4(),
      ownerId: userEmail,
      content: comment,
      createdAt: new Date().toISOString(),
    }]
  }));

  res.send("ok");
}