import request from "supertest";
import { app } from "../server";
import { dbPath as usersDbPath } from "../fileDB/user";
import { setInMemoryStorage } from "../setupTests";

describe("Auth", () => {
  describe("register", () => {
    beforeEach(() => {
      setInMemoryStorage({ [usersDbPath]: [] });
    });
    afterEach(() => {
      setInMemoryStorage({ [usersDbPath]: [] });
    });
    it("should return 400 for missing fields", async () => {
      const testUser = {
        email: "test@test.test"
      }

      const response = await request(app)
        .post("/api/auth/register")
        .send(testUser);

      expect(response.status).toBe(400);
    });

    it("should return 201 even when missing picture", async () => {
      const testUser = {
        name: "test user",
        email: "test@test.test",
        password: "test123",
      }

      const response = await request(app)
        .post("/api/auth/register")
        .send(testUser);

      expect(response.status).toBe(201);
    });

    it("should return 201 and the user created and 409 conflict for the same user again", async () => {
      const testUser = {
        name: "test user",
        email: "test@test.test",
        password: "test123",
        picture: "test.jpg",
      }

      const response = await request(app)
        .post("/api/auth/register")
        .send(testUser);

      expect(response.status).toBe(201);

      const response2 = await request(app)
        .post("/api/auth/register")
        .send(testUser);

      expect(response2.status).toBe(409);
    });
  });

  describe("login", () => {
    beforeAll(() => {
      setInMemoryStorage({
        [usersDbPath]: [{
          name: "test user",
          email: "test@test.test",
          password: "test123",
          picture: "test.jpg",
          followingIds: [],
        }]
      });
    });

    it("should return 400 for missing fields", async () => {
      const testUser = {
        email: "test@test.test",
      }

      const response = await request(app)
        .post("/api/auth/login")
        .send(testUser);

      expect(response.status).toBe(400);
    });

    it("should return 404 for non existing user", async () => {
      const testUser = {
        email: "nonExist@test.test",
        password: "test123",
      }

      const response = await request(app)
        .post("/api/auth/login")
        .send(testUser);

      expect(response.status).toBe(404);
    });

    it("should return 401 for wrong password", async () => {
      const testUser = {
        email: "test@test.test",
        password: "wrongPassword",
      }

      const response = await request(app)
        .post("/api/auth/login")
        .send(testUser);

      expect(response.status).toBe(401);
    });

    it("should return 200 and token for correct user", async () => {
      const testUser = {
        email: "test@test.test",
        password: "test123",
      }

      const response = await request(app)
        .post("/api/auth/login")
        .send(testUser);

      expect(response.status).toBe(200);
      expect(response.body.token).toBeTruthy();
    });

    it("should return 200 and token for correct user with remember me", async () => {
      const testUser = {
        email: "test@test.test",
        password: "test123",
        shouldRemember: true,
      }

      const response = await request(app)
        .post("/api/auth/login")
        .send(testUser);

      expect(response.status).toBe(200);
      expect(response.body.token).toBeTruthy();
    });
  });

  describe("adminLogin", () => {
    it("should return 401 for wrong password", async () => {
      const testUser = {
        password: "wrongPassword",
      }

      const response = await request(app)
        .post("/api/auth/adminLogin")
        .send(testUser);

      expect(response.status).toBe(401);
    });

    it("should return 200 and token for correct password", async () => {
      const testUser = {
        password: process.env.ADMIN_PASSWORD,
      }

      const response = await request(app)
        .post("/api/auth/adminLogin")
        .send(testUser);

      expect(response.status).toBe(200);
      expect(response.body.token).toBeTruthy();
    });
  });
});