const { User } = require("../fileDB/user");
const generateToken = require("./generateToken");

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    res.send("Not found");
    return;
  }

  if (user.password === password) {
    res.json({
      token: generateToken(email),
    });
  } else {
    res.status(401);
    res.send("Unauthorized");
  }
};

module.exports = { login }