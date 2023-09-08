import { postDal } from "../../fileDB/post";

export const updatePostLike = async (req, res) => {
  const userEmail = req.payload.email;
  const postId = req.params.postId;
  const isLike = req.body.isLike;

  await postDal.update(p => p.id === postId, post => ({
    ...post,
    likesIds: isLike ? [...post.likesIds, userEmail] : post.likesIds.filter(email => email !== userEmail)
  }));

  res.send("ok");
}