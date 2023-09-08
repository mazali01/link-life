import { generateAdminToken } from "./tokenHandler";

export const adminLogin = async (req, res) => {
  const { password } = req.body;

  if (password !== process.env.ADMIN_PASSWORD) {
    res.status(401);
    res.send("Unauthorized");
    return;
  }

  res.json({ token: generateAdminToken() });
};