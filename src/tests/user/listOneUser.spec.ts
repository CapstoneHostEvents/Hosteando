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

  let testUser1: User = {
    name: "Ana",
    email: "ana@kenzie.com",
    password: "Aa12345@",
    isAdm: true,
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

  test("Testing a user's listing", async () => {
    const response = await request(app).get(`/users/${response1.body.id}`);

    expect(response.status).toEqual(200);
    expect(response.body);
  });
});
