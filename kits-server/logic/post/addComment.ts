import { postDal } from "../../fileDB/post";
import { v4 as uuidv4 } from 'uuid';

export const addComment = async (req, res) => {
  const userEmail = req.email;
  const postId = req.params.postId;
  const comment = req.body.comment;

  await postDal.updateOne(p => p.id === postId, post => ({
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