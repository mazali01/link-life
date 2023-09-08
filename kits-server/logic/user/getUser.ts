import { userDal } from "../../fileDB/user";

export const getUser = async (req, res) => {
  const { email } = req.query;
  const user = await userDal.findOne({ email: email ?? req.payload.email });

  if (!user) {
    res.status(404);
    res.send("User not found");
    return;
  }

  const following = await userDal.findMany((u) => user.followingIds.includes(u.email));

  res.send({
    email: user.email,
    name: user.name,
    picture: user.picture,
    following,
  });
}