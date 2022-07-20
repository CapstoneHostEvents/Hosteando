import { AppDataSource } from "../../data-source";
import { DataSource } from "typeorm";
import app from "../../app";
import request from "supertest";
import { describe, expect, test, beforeAll, afterAll } from "@jest/globals";

describe("Test for GET method at /users/:id", () => {
  let connection: DataSource;

  interface User {
    name: string;
    email: string;
    password?: string;
    isAdm: boolean;
  }
  interface UserLogin {
    email: string;
    password?: string;
  }

  let testUser1: User = {
    name: "miguel",
    email: "testemiguelito@hotmail.com",
    password: "123456Ab!",
    isAdm: true,
  };

  let loginUser1: UserLogin = {
    email: "testemiguelito@hotmail.com",
    password: "123456Ab!",
  };

  let response1: any;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    response1 = await request(app).post("/users").send(testUser1);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Testing an user's listing", async () => {
    const responseToken = await request(app).post("/login").send(loginUser1);
    const { token } = responseToken.body;
    const response = await request(app)
      .get(`/users/${response1.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toEqual(200);
    expect(response.body);
  });
});
