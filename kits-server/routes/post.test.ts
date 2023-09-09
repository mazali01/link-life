import request from "supertest";
import { setInMemoryStorage } from "../setupTests";
import { dbPath as usersDbPath } from "../fileDB/user";
import { dbPath as postsDbPath } from "../fileDB/post";
import { dbPath as featuresDbPath } from "../fileDB/feature";
import features from "../fileDB/data/features.json";
import { app } from "../server";

describe("posts", () => {
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
      createdAt: new Date().toISOString(),
      likesIds: ["test@test.test"],
      comments: []
    },
    {
      id: "2",
      ownerId: "test@test.test",
      content: "test",
      createdAt: new Date().toISOString(),
      likesIds: [],
      comments: []
    },
    {
      id: "3",
      ownerId: "test2@test.test",
      content: "test",
      createdAt: new Date().toISOString(),
      likesIds: ["test@test.test"],
      comments: [
        {
          id: "1",
          ownerId: "test@test.test",
          content: "test",
          createdAt: new Date().toISOString(),
        }
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

  describe("publish post", () => {
    let token: string;

    beforeEach(async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: users[0].email,
          password: users[0].password,
        });

      token = response.body.token;
    });

    it("should return 401 when not logged in", async () => {
      const response = await request(app)
        .post("/api/post")
        .send({
          content: "test",
        });

      expect(response.status).toBe(401);
    });

    it("should return 400 when missing content", async () => {
      const response = await request(app)
        .post("/api/post")
        .set("Authorization", `Bearer ${token}`)
        .send({});

      expect(response.status).toBe(400);
    });

    it("should return 400 when content is too long", async () => {
      const response = await request(app)
        .post("/api/post")
        .set("Authorization", `Bearer ${token}`)
        .send({
          content: "a".repeat(301),
        });

      expect(response.status).toBe(400);
    });

    it("should return 200 when content is valid", async () => {
      const response = await request(app)
        .post("/api/post")
        .set("Authorization", `Bearer ${token}`)
        .send({
          content: "test",
        });

      expect(response.status).toBe(200);
    });
  });

  describe("like post", () => {
    let token: string;

    beforeEach(async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: users[0].email,
          password: users[0].password,
        });

      token = response.body.token;
    });

    it("should return 401 when not logged in", async () => {
      const response = await request(app)
        .put("/api/post/1/like")
        .send({ isLike: true });

      expect(response.status).toBe(401);
    });

    it("should return 404 when post does not exist", async () => {
      const response = await request(app)
        .put("/api/post/123/like")
        .set("Authorization", `Bearer ${token}`)
        .send({ isLike: true });

      expect(response.status).toBe(404);
    });

    it("should return 200 when post exists", async () => {
      const response = await request(app)
        .put("/api/post/1/like")
        .set("Authorization", `Bearer ${token}`)
        .send({ isLike: true });

      expect(response.status).toBe(200);
    });

    it("should return 200 when post exists", async () => {
      const response = await request(app)
        .put("/api/post/1/like")
        .set("Authorization", `Bearer ${token}`)
        .send({ isLike: false });

      expect(response.status).toBe(200);
    });
  });

  describe("add comment", () => {
    let token: string;

    beforeEach(async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: users[0].email,
          password: users[0].password,
        });

      token = response.body.token;
    });

    it("should return 401 when not logged in", async () => {
      const response = await request(app)
        .post("/api/post/1/comment")
        .send({ comment: "test" });

      expect(response.status).toBe(401);
    });

    it("should return 404 when post does not exist", async () => {
      const response = await request(app)
        .post("/api/post/123/comment")
        .set("Authorization", `Bearer ${token}`)
        .send({ comment: "test" });

      expect(response.status).toBe(404);
    });

    it("should return 400 when missing content", async () => {
      const response = await request(app)
        .post("/api/post/1/comment")
        .set("Authorization", `Bearer ${token}`)
        .send({});

      expect(response.status).toBe(400);
    });

    it("should return 200 when post exists", async () => {
      const response = await request(app)
        .post("/api/post/1/comment")
        .set("Authorization", `Bearer ${token}`)
        .send({ comment: "test" });

      expect(response.status).toBe(200);
    });
  });

  describe("delete post", () => {
    let token: string;

    beforeEach(async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: users[0].email,
          password: users[0].password,
        });

      token = response.body.token;
    });

    it("should return 401 when not logged in", async () => {
      const response = await request(app)
        .delete("/api/post/1");

      expect(response.status).toBe(401);
    });

    it("should return 404 when post does not exist", async () => {
      const response = await request(app)
        .delete("/api/post/123")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(404);
    });

    it("should return 200 when post exists", async () => {
      const response = await request(app)
        .delete("/api/post/1")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
    });
  });

  describe("delete comment", () => {
    let token: string;

    beforeEach(async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: users[0].email,
          password: users[0].password,
        });

      token = response.body.token;
    });

    it("should return 401 when not logged in", async () => {
      const response = await request(app)
        .delete("/api/post/1/comment/1");

      expect(response.status).toBe(401);
    });

    it("should return 404 when post does not exist", async () => {
      const response = await request(app)
        .delete("/api/post/123/comment/1")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(404);
    });

    it("should return 404 when comment does not exist", async () => {
      const response = await request(app)
        .delete("/api/post/3/comment/123")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(404);
    });

    it("should return 200 when comment exists", async () => {
      const response = await request(app)
        .delete("/api/post/3/comment/1")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
    });
  });
});
