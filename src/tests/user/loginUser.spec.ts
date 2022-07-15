import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import { describe, expect, test, beforeAll, afterAll } from "@jest/globals";
import app from "../../app";
import request from "supertest";

describe("Testing POST /login", () => {
  let connection: DataSource

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


  let testUser: User = {
    name: "miguel",
    email: "testemiguel@hotmail.com",
    password: "123456Ab!",
    isAdm: true,
  };

  let loginUser: UserLogin = {
    email: "testemiguel@hotmail.com",
    password: "123456Ab!",
  }

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

      await request(app).post("/users").send(testUser);

  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Testing POST /login route", async () => {
    const response = await request(app).post("/login").send(loginUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("token");
    expect(typeof response.body.token).toBe("string");
  });

  test ("Testing invalid login", async () => {
    loginUser.password = "123";
    const response = await request(app).post("/login").send(loginUser);
    

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message", "Wrong email/password");
    loginUser.password = "123456";
  });

});
