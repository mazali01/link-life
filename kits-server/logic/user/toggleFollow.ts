import { userDal } from "../../fileDB/user";

export const toggleFollow = async (req, res) => {
  const { email } = req.query;
  const { otherEmail } = req.params;
  const user = await userDal.findOne({ email: email ?? req.payload.email });

  if (!user) {
    res.status(404);
    res.send("User not found");
    return;
  }

  const isFollowing = user.followingIds.includes(otherEmail);

  if (isFollowing) {
    user.followingIds = user.followingIds.filter((id) => id !== otherEmail);
  } else {
    user.followingIds.push(otherEmail);
  }

  await userDal.update(_ => _.email === user.email, oldUser => ({
    ...oldUser,
    followingIds: user.followingIds,
  }));

  res.send(isFollowing);
}