import { postDal } from "../../fileDB/post";

export const deletePost = async (req, res) => {
  const postId = req.params.postId;

  await postDal.delete(p => p.id === postId);

  res.send("ok");
}