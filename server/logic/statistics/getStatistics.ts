import dayjs from "dayjs";
import { postDal } from "../../fileDB/post";
import { userDal } from "../../fileDB/user";

export const getStatistics = async (req, res) => {
  const users = await userDal.findMany(_ => true);
  const posts = await postDal.findMany(_ => true);

  const statistics = {
    postsCount: posts.length,
    usersCount: users.length,
    likesCount: posts.flatMap(_ => _.likesIds).length,
    commentsCount: posts.flatMap(_ => _.comments).length,
    postsPeriod: {
      week: posts.filter(_ => dayjs(_.createdAt).isAfter(dayjs().subtract(1, "week"))).length,
      month: posts.filter(_ => dayjs(_.createdAt).isAfter(dayjs().subtract(1, "month"))).length,
      year: posts.filter(_ => dayjs(_.createdAt).isAfter(dayjs().subtract(1, "year"))).length,
    },
    postPictureRate: posts.filter(_ => _.picture).length / posts.length,
    userPictureRate: users.filter(_ => _.picture).length / users.length,
  };
  res.send(statistics);
}