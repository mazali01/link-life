import { postDal } from "../../fileDB/post";
import { v4 as uuidv4 } from 'uuid';

export const publishPost = async (req, res) => {
  const userEmail = req.payload.email;
  const { content, picture } = req.body;

  await postDal.create({
    id: uuidv4(),
    content,
    picture,
    ownerId: userEmail,
    createdAt: new Date().toISOString(),
    comments: [],
    likesIds: [],
  });

  res.send("ok");
}