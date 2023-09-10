import { userDal } from "../../fileDB/user";

export const getIsFollowing = async (req, res) => {
  const { otherEmail } = req.params;
  const user = (await userDal.findOne({ email: req.payload.email }))!;

  const isFollowing = user.followingIds.includes(otherEmail);

  res.send(isFollowing);
}