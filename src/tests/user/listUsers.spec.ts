import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import { describe, expect, test, beforeAll, afterAll } from "@jest/globals";
import app from "../../app";
import request from "supertest";

describe("Testing GET /users", () => {
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

  test("Should be able to list all users", async () => {
      const responseToken = await request(app).post("/login").send(loginUser);
      const {token} = responseToken.body
      const response = await request(app).get("/users").set("Authorization", `Bearer ${token}`);

      delete testUser.password //password deletada porque a requisição dos usuarios não contem password 

    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(1);
    expect(Array.isArray(response.body)).toBe(true);
     expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
            ...testUser,
            id: response.body[0].id,
            created_at: response.body[0].created_at,
            updated_at: response.body[0].updated_at,
          }),
      ])
    );
  });

});