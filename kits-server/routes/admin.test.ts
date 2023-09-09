import request from "supertest";
import { app } from "../server";
import { dbPath as featuresDbPath } from "../fileDB/feature";
import { dbPath as usersDbPath } from "../fileDB/user";
import { dbPath as postsDbPath } from "../fileDB/post";
import features from "../fileDB/data/features.json";
import { setInMemoryStorage } from "../setupTests";
import { advanceBy, clear } from "jest-date-mock";

describe("Admin", () => {
  beforeEach(() => {
    setInMemoryStorage({ [featuresDbPath]: features });
  });
  afterEach(() => {
    setInMemoryStorage({ [featuresDbPath]: features });
  });

  describe("validateToken", () => {
    afterAll(() => {
      clear();
    });

    it("should return 401 for missing token", async () => {
      const response = await request(app)
        .get("/api/admin/features");

      expect(response.status).toBe(401);
    });

    it("should return 401 for invalid token", async () => {
      const response = await request(app)
        .post("/api/auth/adminLogin")
        .send({ password: process.env.ADMIN_PASSWORD });

      const token = response.body.token;
      advanceBy(1000 * 60 * 60);

      const featureResponse = await request(app)
        .get("/api/admin/features")
        .set("Authorization", `Bearer ${token}`);

      expect(featureResponse.status).toBe(401);
    });

    it("should return 200 for valid token", async () => {
      const response = await request(app)
        .post("/api/auth/adminLogin")
        .send({ password: process.env.ADMIN_PASSWORD });

      const token = response.body.token;

      const featureResponse = await request(app)
        .get("/api/admin/features")
        .set("Authorization", `Bearer ${token}`);

      expect(featureResponse.status).toBe(200);
    });
  });

  describe("features", () => {
    let token: string;
    beforeEach(async () => {
      const response = await request(app)
        .post("/api/auth/adminLogin")
        .send({ password: process.env.ADMIN_PASSWORD });

      token = response.body.token;
    });

    it("should return 200 and features", async () => {
      const featureResponse = await request(app)
        .get("/api/admin/features")
        .set("Authorization", `Bearer ${token}`);

      expect(featureResponse.status).toBe(200);
      expect(featureResponse.body).toEqual(features);
    });

    it("should return 200 and updated features", async () => {
      const arbitraryFeature = features[2];
      const expectedEnabled = !arbitraryFeature.enabled;

      const featureResponse = await request(app)
        .put(`/api/admin/features?type=${arbitraryFeature.type}`)
        .set("Authorization", `Bearer ${token}`);

      expect(featureResponse.status).toBe(200);

      const updatedFeatureResponse = await request(app)
        .get("/api/admin/features")
        .set("Authorization", `Bearer ${token}`);

      expect(updatedFeatureResponse.body.find(_ => _.type === arbitraryFeature.type).enabled).toEqual(expectedEnabled);
    });
  });

  describe("users", () => {
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
        likesIds: ["test2@test.test"],
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
        [usersDbPath]: users,
        [postsDbPath]: posts
      });
    });
    afterEach(() => {
      setInMemoryStorage({
        [usersDbPath]: users,
        [postsDbPath]: posts
      });
    });

    let token: string;
    beforeEach(async () => {
      const response = await request(app)
        .post("/api/auth/adminLogin")
        .send({ password: process.env.ADMIN_PASSWORD });

      token = response.body.token;
    });

    it("should return 200 and users", async () => {
      const featureResponse = await request(app)
        .get("/api/admin/users")
        .set("Authorization", `Bearer ${token}`);

      expect(featureResponse.status).toBe(200);
      expect(featureResponse.body).toEqual(users);
    });

    it("should delete user", async () => {
      const arbitraryUser = users[0];

      const deletedUserResponse = await request(app)
        .delete(`/api/admin/users?email=${arbitraryUser.email}`)
        .set("Authorization", `Bearer ${token}`);

      expect(deletedUserResponse.status).toBe(200);

      const updatedUsersResponse = await request(app)
        .get("/api/admin/users")
        .set("Authorization", `Bearer ${token}`);

      expect(updatedUsersResponse.body.find(_ => _.email === arbitraryUser.email)).toBeUndefined();
    });
  });

  describe("statistics", () => {
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
        [usersDbPath]: users,
        [postsDbPath]: posts
      });
    });

    afterEach(() => {
      setInMemoryStorage({
        [usersDbPath]: users,
        [postsDbPath]: posts
      });
    });

    let token: string;
    beforeEach(async () => {
      const response = await request(app)
        .post("/api/auth/adminLogin")
        .send({ password: process.env.ADMIN_PASSWORD });

      token = response.body.token;
    });

    it("should return 200 and statistics", async () => {
      const featureResponse = await request(app)
        .get("/api/admin/statistics")
        .set("Authorization", `Bearer ${token}`);

      expect(featureResponse.status).toBe(200);
      expect(featureResponse.body).toEqual({
        commentsCount: 1,
        likesCount: 2,
        usersCount: 2,
        postsCount: 3,
        postPictureRate: 0,
        postsPeriod: {
          month: 3,
          week: 3,
          year: 3,
        },
        userPictureRate: 0.5,
      });
    });
  });
});