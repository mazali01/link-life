import { faker } from '@faker-js/faker';
import { userDal } from '../fileDB/user';

export const getFakeFeeds = async () =>
  (await Promise.all(Array.from({ length: 50 })
    .map(async (_, index) => ({
      id: index,
      content: faker.lorem.sentences(),
      image: Math.random() > 0.8 ? faker.image.urlPicsumPhotos() : undefined,
      createdAt: faker.date.past(),
      user: {
        email: faker.internet.email(),
        name: faker.person.fullName(),
        picture: faker.image.avatar()
      },
      comments: Array.from({ length: Math.random() * 100 })
        .map((_, index) => ({
          id: index,
          content: faker.lorem.sentence(),
          createdAt: faker.date.past(),
          user: {
            email: faker.internet.email(),
            name: faker.person.fullName(),
            picture: faker.image.avatar()
          }
        })),
      likes: Array.from({ length: Math.random() * 100 })
        .map((_, index) => ({
          id: index,
          user: {
            email: faker.internet.email(),
            name: faker.person.fullName(),
            picture: faker.image.avatar()
          }
        })).concat(Math.random() > 0.5 ? [{
          id: 100,
          user: (await userDal.findOne({ email: "mazal.iliad@gmail.com" }))!
        }] : [])
    })))).sort((a, b) => b.createdAt.getDate() - a.createdAt.getDate());