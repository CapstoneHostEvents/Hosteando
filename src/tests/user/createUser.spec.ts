import { AppDataSource } from "../../data-source";
import { DataSource } from "typeorm";
import app from "../../app";
import request from "supertest";
import { describe, expect, test, beforeAll, afterAll } from "@jest/globals";

describe("Test for POST method at /users", () => {
  let connection: DataSource;
  let testUser = {
    isAdm: true,
    name: "Ana",
    email: "ana@kenzie.com",
    password: "Aa12345@",
  };

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Create an user", async () => {
    const response = await request(app).post("/users").send(testUser);

    expect(response.status).toEqual(201);
    expect(response.body.id.length).toEqual(36);
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).toEqual(
      expect.objectContaining({
        isAdm: response.body.isAdm,
        id: response.body.id,
        name: testUser.name,
        email: testUser.email,
        created_at: response.body.created_at,
        updated_at: response.body.updated_at,
      })
    );
  });

  test("Trying to create an user with the same email address", async () => {
    const response = await request(app).post("/users").send(testUser);

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("message");
  });

  test("Trying to create an user without passing data", async () => {
    const response = await request(app).post("/users").send();

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("error");
  });
});