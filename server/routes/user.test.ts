import request from "supertest";
import { advanceBy, clear } from "jest-date-mock";
import { app } from "../server";
import { setInMemoryStorage } from "../setupTests";
import { dbPath as usersDbPath } from "../fileDB/user";
import { dbPath as postsDbPath } from "../fileDB/post";
import { dbPath as featuresDbPath } from "../fileDB/feature";
import features from "../fileDB/data/features.json";


describe("Users", () => {
  const users = [
    {
      name: "Test User",
      email: "test@test.test",
      password: "test",
      followingIds: [],
    },
    {
      password: "test",
      name: "Test User 2",
      email: "test2@test.test",
      picture: "https://test.test/test.png",
      followingIds: ["test@test.test"],
    }
  ];

  const posts = [
    {
      id: "1",
      ownerId: "test@test.test",
      content: "test",
      createdAt: new Date(2004, 1, 1).toISOString(),
      likesIds: ["test@test.test"],
      comments: []
    },
    {
      id: "2",
      ownerId: "test@test.test",
      content: "test",
      createdAt: new Date(2000, 1, 1).toISOString(),
      likesIds: [],
      comments: [
        {
          id: "1",
          ownerId: "test2@test.test",
          content: "test",
          createdAt: new Date().toISOString(),
        }
      ]
    },
    {
      id: "3",
      ownerId: "test2@test.test",
      content: "test",
      createdAt: new Date(2007, 1, 1).toISOString(),
      likesIds: ["test@test.test"],
      comments: [
        {
          id: "1",
          ownerId: "test@test.test",
          content: "test",
          createdAt: new Date(2004, 1, 1).toISOString(),
        },
        {
          id: "2",
          ownerId: "test2@test.test",
          content: "test",
          createdAt: new Date(2000, 1, 1).toISOString(),
        },
        {
          id: "2",
          ownerId: "test@test.test",
          content: "test",
          createdAt: new Date(2007, 1, 1).toISOString(),
        },

      ]
    }
  ];

  beforeEach(() => {
    setInMemoryStorage({
      [featuresDbPath]: features,
      [usersDbPath]: users,
      [postsDbPath]: posts
    });
  });


  describe("validateToken", () => {
    afterAll(() => {
      clear();
    });

    it("should return 401 for missing token", async () => {
      const response = await request(app)
        .get("/api/user");

      expect(response.status).toBe(401);
    });

    it("should return 401 for invalid token", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({ email: "test@test.test", password: "test" });

      const token = response.body.token;

      advanceBy(1000 * 60 * 60);

      const usersResponse = await request(app)
        .get("/api/user")
        .set("Authorization", `Bearer ${token}`);

      expect(usersResponse.status).toBe(401);
    });

    it("should return 401 for expired token with remember me after 10 days", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({ email: "test@test.test", password: "test", shouldRemember: true });

      const token = response.body.token;

      advanceBy(1000 * 60 * 60 * 24 * 5);

      const usersResponse1 = await request(app)
        .get("/api/user")
        .set("Authorization", `Bearer ${token}`);

      expect(usersResponse1.status).toBe(200);

      advanceBy(1000 * 60 * 60 * 24 * 6);

      const usersResponse2 = await request(app)
        .get("/api/user")
        .set("Authorization", `Bearer ${token}`);

      expect(usersResponse2.status).toBe(401);
    });

    it("should return 200 for valid token", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({ email: "test@test.test", password: "test" });

      const token = response.body.token;

      const usersResponse = await request(app)
        .get("/api/user")
        .set("Authorization", `Bearer ${token}`);

      expect(usersResponse.status).toBe(200);
    });
  });

  describe("getUser", () => {
    let token: string;
    beforeEach(async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({ email: users[0].email, password: users[0].password });

      token = response.body.token;
    });

    it("should return 200 and user", async () => {
      const usersResponse = await request(app)
        .get("/api/user")
        .set("Authorization", `Bearer ${token}`);

      expect(usersResponse.status).toBe(200);
      expect(usersResponse.body.email).toEqual(users[0].email);
    });

    it("should return 404 for non existing user", async () => {
      const usersResponse = await request(app)
        .get("/api/user")
        .query({ email: "nonExisting@test.test" })
        .set("Authorization", `Bearer ${token}`);

      expect(usersResponse.status).toBe(404);
    });

    it("should return 200 and user with posts", async () => {
      const usersResponse = await request(app)
        .get("/api/user")
        .query({ email: users[1].email })
        .set("Authorization", `Bearer ${token}`);

      expect(usersResponse.status).toBe(200);
      expect(usersResponse.body.email).toEqual(users[1].email);
      expect(usersResponse.body.following.length)
        .toBe(users[1].followingIds.length);
    });
  });

  describe("updateUser", () => {
    let token: string;
    beforeEach(async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({ email: users[0].email, password: users[0].password });

      token = response.body.token;
    });

    it("should return 200 and update user", async () => {
      const name = "updated name";
      const picture = "updated picture";

      const usersResponse = await request(app)
        .put("/api/user")
        .send({ name, picture })
        .set("Authorization", `Bearer ${token}`);

      expect(usersResponse.status).toBe(200);

      const updatedUserResponse = await request(app)
        .get("/api/user")
        .set("Authorization", `Bearer ${token}`);

      expect(updatedUserResponse.body.name).toBe(name);
      expect(updatedUserResponse.body.picture).toBe(picture);
    });
  });

  describe("searchUsers", () => {
    let token: string;
    beforeEach(async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({ email: users[0].email, password: users[0].password });

      token = response.body.token;
    });

    it("should return 200 and search users with prefix", async () => {
      const usersResponse = await request(app)
        .get("/api/user/search")
        .query({ term: "2", method: "prefix" })
        .set("Authorization", `Bearer ${token}`);

      expect(usersResponse.status).toBe(200);
      expect(usersResponse.body.length).toBe(0);
    });

    it("should return 200 and search users with contains", async () => {
      const usersResponse = await request(app)
        .get("/api/user/search")
        .query({ term: "2", method: "contains" })
        .set("Authorization", `Bearer ${token}`);

      expect(usersResponse.status).toBe(200);
      expect(usersResponse.body.length).toBe(1);
    });

    it("should return 200 and search users with suffix", async () => {
      const usersResponse = await request(app)
        .get("/api/user/search")
        .query({ term: "User 2", method: "suffix" })
        .set("Authorization", `Bearer ${token}`);

      expect(usersResponse.status).toBe(200);
      expect(usersResponse.body.length).toBe(1);
    });
  });

  describe("following", () => {
    let token: string;
    beforeEach(async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({ email: users[0].email, password: users[0].password });

      token = response.body.token;
    });

    it("should return 200 and toggle user following list", async () => {
      const usersResponse = await request(app)
        .put(`/api/user/following/${users[1].email}`)
        .set("Authorization", `Bearer ${token}`);

      expect(usersResponse.status).toBe(200);

      const updatedUserResponse = await request(app)
        .get("/api/user")
        .set("Authorization", `Bearer ${token}`);

      expect(updatedUserResponse.body.following.length).toBe(1);

      const usersResponse2 = await request(app)
        .put(`/api/user/following/${users[1].email}`)
        .set("Authorization", `Bearer ${token}`);

      expect(usersResponse2.status).toBe(200);

      const updatedUserResponse2 = await request(app)
        .get("/api/user")
        .set("Authorization", `Bearer ${token}`);

      expect(updatedUserResponse2.body.following.length).toBe(0);
    });

    it("should return isFollowing true for following user", async () => {
      const usersResponse = await request(app)
        .get(`/api/user/following/${users[1].email}`)
        .set("Authorization", `Bearer ${token}`);

      expect(usersResponse.status).toBe(200);
      expect(usersResponse.body).toBe(true);
    });

    it("should return isFollowing false for not following user", async () => {
      const usersResponse = await request(app)
        .get(`/api/user/following/${users[0].email}`)
        .set("Authorization", `Bearer ${token}`);

      expect(usersResponse.status).toBe(200);
      expect(usersResponse.body).toBe(false);
    });
  });

  describe("features", () => {
    let token: string;
    beforeEach(async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({ email: users[0].email, password: users[0].password });

      token = response.body.token;
    });

    it("should return 401 for non admin", async () => {
      const featureResponse = await request(app)
        .get("/api/admin/features")
        .set("Authorization", `Bearer ${token}`);

      expect(featureResponse.status).toBe(401);
    });

    it("should return 200 for user features route", async () => {
      const featureResponse = await request(app)
        .get("/api/user/features")
        .set("Authorization", `Bearer ${token}`);

      expect(featureResponse.status).toBe(200);
      expect(Object.keys(featureResponse.body).sort()).toEqual(features.map(_ => _.type).sort());
    });
  });

  describe("feeds", () => {
    let token: string;
    beforeEach(async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({ email: users[0].email, password: users[0].password });

      token = response.body.token;
    });

    it("should return 200 and user posts", async () => {
      const postsResponse = await request(app)
        .get("/api/user/feeds")
        .set("Authorization", `Bearer ${token}`);

      expect(postsResponse.status).toBe(200);
      expect(postsResponse.body.length).toBe(3);
      expect(postsResponse.body[0].comments.length).toBe(3);
      expect(postsResponse.body[1].comments.length).toBe(0);
      expect(postsResponse.body[0].likes.length).toBe(1);
      expect(postsResponse.body[1].likes.length).toBe(1);
    });

    it("should return 404 when not exists other user posts", async () => {
      const postsResponse = await request(app)
        .get(`/api/user/feeds?only=notExists@test.test`)
        .set("Authorization", `Bearer ${token}`);

      expect(postsResponse.status).toBe(404);
    });

    it("should return 200 and other user posts", async () => {
      const postsResponse = await request(app)
        .get(`/api/user/feeds?only=${users[1].email}`)
        .set("Authorization", `Bearer ${token}`);

      expect(postsResponse.status).toBe(200);
      expect(postsResponse.body.length).toBe(1);
      expect(postsResponse.body[0].comments.length).toBe(3);
      expect(postsResponse.body[0].likes.length).toBe(1);
    });

    it("should return 200 and liked by posts", async () => {
      const postsResponse = await request(app)
        .get(`/api/user/feeds?likedBy=${users[0].email}`)
        .set("Authorization", `Bearer ${token}`);

      expect(postsResponse.status).toBe(200);
      expect(postsResponse.body.length).toBe(2);
      expect(postsResponse.body[0].comments.length).toBe(3);
      expect(postsResponse.body[1].comments.length).toBe(0);
      expect(postsResponse.body[0].likes.length).toBe(1);
      expect(postsResponse.body[1].likes.length).toBe(1);
    });
  });
});