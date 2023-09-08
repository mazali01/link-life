import { postDal } from "../../fileDB/post";

export const deleteComment = async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;

  await postDal.update(p => p.id === postId, post => ({
    ...post,
    comments: post.comments.filter(c => c.id !== commentId)
  }));

  res.send("ok");
}