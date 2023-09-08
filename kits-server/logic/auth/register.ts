import { userDal } from "../../fileDB/user";

export const register = async (req, res) => {
  const { name, email, password, picture } = req.body;

  const userExists = await userDal.findOne({ email });

  if (userExists) {
    res.status(409);
    res.send("User exists");
    return;
  }

  await userDal.create({
    name,
    email,
    password,
    picture,
    followingIds: [],
  });

  res.status(201);
  res.send("Created!");
};