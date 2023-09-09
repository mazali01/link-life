import { postDal } from "../../fileDB/post";

export const deleteComment = async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;

  const post = await postDal.findOne({ id: postId });

  if (!post || !post.comments.find(c => c.id === commentId)) {
    res.status(404);
    res.send("Post not found");
    return;
  }

  await postDal.update(p => p.id === postId, post => ({
    ...post,
    comments: post.comments.filter(c => c.id !== commentId)
  }));

  res.send("ok");
}