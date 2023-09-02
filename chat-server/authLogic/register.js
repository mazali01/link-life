const { User } = require("../fileDB/user");

const register = async (req, res) => {
  const { username, email, password, picture } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(409);
    res.send("User exists");
    return;
  }

  await User.create({
    username,
    email,
    password,
    picture
  });

  res.status(201);
  res.send("Created!");
};

module.exports = { register };