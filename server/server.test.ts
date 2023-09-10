import request from "supertest";
import { app } from "./server";

describe(" is alive", () => {
  it("should return 200", async () => {
    const response = await request(app)
      .get("/");

    expect(response.status).toBe(200);
  });
});