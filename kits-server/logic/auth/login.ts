import { userDal } from "../../fileDB/user";
import { generateToken } from "./tokenHandler";

export const login = async (req, res) => {
  const { email, password, shouldRemember } = req.body;

  if (!email || !password) {
    res.status(400);
    res.send("Missing fields");
    return;
  }

  const user = await userDal.findOne({ email });
  if (!user) {
    res.status(404);
    res.send("Not found");
    return;
  }

  if (user.password === password) {
    res.json({
      token: generateToken(email, shouldRemember),
    });
  } else {
    res.status(401);
    res.send("Unauthorized");
  }
};