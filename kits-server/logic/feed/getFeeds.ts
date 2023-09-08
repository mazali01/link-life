import dayjs from "dayjs";
import { PostModel, postDal } from "../../fileDB/post";
import { userDal } from "../../fileDB/user";

export const getFeeds = async (req, res) => {
  const { only, likedBy } = req.query;

  const user = await userDal.findOne({ email: only ?? req.email });
  if (!user) {
    res.status(404);
    res.send("Not found");
    return;
  }

  const allOwnerIds = [user.email];

  if (!only) {
    allOwnerIds.push(...user.followingIds);
  }

  const matchPost = (p: PostModel) => {
    const isOwner = allOwnerIds.includes(p.ownerId);
    const isLikedBy = likedBy ? p.likesIds.includes(likedBy) : true;
    return isOwner && isLikedBy;
  }

  const postsRaw = await postDal.findMatch(matchPost);

  const posts = await Promise.all(postsRaw.map(async p => ({
    id: p.id,
    createdAt: p.createdAt,
    content: p.content,
    image: p.picture,
    user: await userDal.findOne({ email: p.ownerId }),
    comments: (await Promise.all(p.comments.map(async c => ({
      id: c.id,
      user: await userDal.findOne({ email: c.ownerId }),
      content: c.content,
      createdAt: c.createdAt,
    })))).sort((a, b) => dayjs(a.createdAt).isBefore(b.createdAt) ? 1 : -1),
    likes: await userDal.findMatch(u => p.likesIds.includes(u.email)),
  })));

  res.send(posts.sort((a, b) => dayjs(a.createdAt).isBefore(b.createdAt) ? 1 : -1));
};