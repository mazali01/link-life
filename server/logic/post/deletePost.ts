import { postDal } from "../../fileDB/post";

export const deletePost = async (req, res) => {
  const postId = req.params.postId;

  const post = await postDal.findOne({ id: postId });

  if (!post) {
    res.status(404);
    res.send("Post not found");
    return;
  }

  await postDal.delete(p => p.id === postId);

  res.send("ok");
}