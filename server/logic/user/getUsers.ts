import { userDal } from "../../fileDB/user";

export const getUsers = async (req, res) => {
  const users = await userDal.findMany(_ => true);
  res.send(users);
}