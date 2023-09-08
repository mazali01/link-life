import { userDal } from "../../fileDB/user";

export const updateUser = async (req, res) => {
  const partialUpdate = req.body;

  await userDal.updateOne(_ => _.email === req.email, user => ({
    ...user,
    ...partialUpdate
  }));

  res.send("Updated!");
}