import { userDal } from "../../fileDB/user";

export const updateUser = async (req, res) => {
  const partialUpdate = req.body;

  await userDal.update(_ => _.email === req.payload.email, user => ({
    ...user,
    ...partialUpdate
  }));

  res.send("Updated!");
}