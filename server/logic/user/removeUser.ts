import { postDal } from "../../fileDB/post";
import { userDal } from "../../fileDB/user";

export const removeUser = async (req, res) => {
  const { email } = req.query;

  await postDal.update(_ => _.comments.some(comment => comment.ownerId === email), post => ({
    ...post,
    comments: post.comments.filter(comment => comment.ownerId !== email)
  }));

  await postDal.update(_ => _.likesIds.includes(email), post => ({
    ...post,
    likesIds: post.likesIds.filter(id => id !== email)
  }));

  await postDal.delete(_ => _.ownerId === email);

  await userDal.update(_ => _.followingIds.includes(email), user => ({
    ...user,
    followingIds: user.followingIds.filter(id => id !== email)
  }));

  await userDal.delete(_ => _.email === email);

  res.send("Removed!");
}