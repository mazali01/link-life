import { userDal } from "../../fileDB/user";

export const getIsFollowing = async (req, res) => {
  const { email } = req.query;
  const { otherEmail } = req.params;
  const user = await userDal.findOne({ email: email ?? req.payload.email });

  if (!user) {
    res.status(404);
    res.send("User not found");
    return;
  }

  const isFollowing = user.followingIds.includes(otherEmail);

  res.send(isFollowing);
}