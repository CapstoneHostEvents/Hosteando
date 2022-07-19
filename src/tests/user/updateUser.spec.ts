import { AppDataSource } from "../../data-source";

import { DataSource } from "typeorm";
import app from "../../app";
import request from "supertest";
import { describe, expect, test, beforeAll, afterAll } from "@jest/globals";

describe("Test for PATCH method at /users/:id", () => {
  let connection: DataSource;

  interface User {
    name: string;
    email: string;
    password?: string;
    isAdm?: boolean;
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

  let testUser1: User = {
    name: "Maria",
    email: "maria@kenzie.com",
    password: "123456Ab!",
  };

  let loginUser: UserLogin = {
    email: "testemiguel@hotmail.com",
    password: "123456Ab!",
  };

  let response1: any;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    response1 = await request(app).post("/users").send(testUser);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Trying to update an user", async () => {
    const responseToken = await request(app).post("/login").send(loginUser);
    const { token } = responseToken.body;
    const responsePatch = await request(app)
      .patch(`/users/${response1.body.id}`)
      .send(testUser1)
      .set("Authorization", `Bearer ${token}`);

    const responseGet = await request(app).get(`/users/${response1.body.id}`);

    expect(responsePatch.status).toEqual(200);
    expect(responsePatch.body).toHaveProperty("message");

    expect(responseGet.body).toEqual(
      expect.objectContaining({
        id: responseGet.body.id,
        name: testUser1.name,
        email: testUser1.email,
        created_at: responseGet.body.created_at,
        updated_at: responseGet.body.updated_at,
      })
    );
  });

  test("Trying to update an user that doesn't exist", async () => {
    const response = await request(app).get(`/users/1`);

    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty("message");
  });
});
