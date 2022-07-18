import { AppDataSource } from "../../data-source";
import { DataSource } from "typeorm";
import app from "../../app";
import request from "supertest";
import {describe, expect, test, beforeAll, afterAll} from "@jest/globals";
 
describe("Test for DELETE method at /users/:id", () => {
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
 
  test("Trying to delete a user", async () => {
    const responseDelete = await request(app).delete(
      `/users/${response1.body.id}`
    );
 
    expect(responseDelete.status).toEqual(200);
    expect(responseDelete.body).toHaveProperty("message");
  });
 
  test("Trying to delete a user that doesn't exist", async () => {
    const response = await request(app).get(`/users/1`);
 
    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty("message");
  });
});
