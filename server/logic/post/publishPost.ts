import { postDal } from "../../fileDB/post";
import { v4 as uuidv4 } from 'uuid';

export const publishPost = async (req, res) => {
  const userEmail = req.payload.email;
  const { content, picture } = req.body;

  if (!content && !picture) {
    res.status(400);
    res.send("Content or picture is required");
    return;
  }

  if (content && content.length > 300) {
    res.status(400);
    res.send("Content is too long");
    return;
  }

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