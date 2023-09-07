import { userDal } from "../../fileDB/user";

export const getUser = async (req, res) => {
  const user = await userDal.findOne({ email: req.email });
  res.send(user);
}