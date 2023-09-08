import { UserModel, userDal } from "../../fileDB/user";

export const searchUsers = async (req, res) => {
  const methodToFunction = {
    prefix: (user: UserModel) => user.name.toLowerCase().startsWith(term.toLowerCase()) || user.email.toLowerCase().startsWith(term.toLowerCase()),
    contains: (user: UserModel) => user.name.toLowerCase().includes(term.toLowerCase()) || user.email.toLowerCase().includes(term.toLowerCase()),
    suffix: (user: UserModel) => user.name.toLowerCase().endsWith(term.toLowerCase()) || user.email.toLowerCase().endsWith(term.toLowerCase()),
  };

  const term = req.query.term as string;
  const method = req.query.method as string;

  const users = await userDal.findMany(methodToFunction[method]);
  res.send(users);
}