import dayjs from "dayjs";
import { getFakeFeeds } from "../../fake-data/fake";
import { postDal } from "../../fileDB/post";
import { userDal } from "../../fileDB/user";

export const getFeeds = async (req, res) => {
  const user = await userDal.findOne({ email: req.email });
  if (!user) {
    res.status(404);
    res.send("Not found");
    return;
  }

  const allOwnerIds = [user.email, ...user.friendsIds];

  const postsRaw = await postDal.findMatch(p => allOwnerIds.includes(p.ownerId));

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

  // const fakeData = await getFakeFeeds();

  res.send(posts.sort((a, b) => dayjs(a.createdAt).isBefore(b.createdAt) ? 1 : -1));
};