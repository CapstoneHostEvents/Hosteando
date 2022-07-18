import request from "supertest";
import app from "../../app";
import { DataSource } from "typeorm";

import { describe, expect, test, beforeAll, afterAll, it } from "@jest/globals";
import { AppDataSource } from "../../data-source";

const mockUserAdm = {
  name: "daniel",
  email: "daniel@kenzie.com",
  password: "1234",
  isAdm: true,
};

const loginAdm = {
  email: "daniel@kenzie.com",
  password: "1234",
};

const mockUserAdm2 = {
  name: "daniel",
  email: "daniel2@kenzie.com",
  password: "1234",
  isAdm: true,
};

const loginAdm2 = {
  email: "daniel2@kenzie.com",
  password: "1234",
};

const mockUserNoAdm = {
  name: "ugo",
  email: "ugo@kenzie.com",
  password: "1234",
  isAdm: false,
};

const loginNoAdm = {
  email: "ugo@kenzie.com",
  password: "1234",
};

const eventCorrect = {
  name: "Event1caio",
  description: "new event",
  date: "2025-07-07 17:01:18.410677",
};

const zoneCorret = {
  name: "lounge VIP",
  price: 3000,
  total_tickets: 200,
  eventId: "",
};

const zoneUpdate = {
  name: "novo lounge",
  price: 300,
  total_tickets: 50,
};

let tokenAdm = "";
let tokenAdm2 = "";
let tokenNoAdm = "";

let zoneId = "";

describe("Testes rota /zones", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    const signupAdmResponse = await request(app)
      .post("/users")
      .send(mockUserAdm);
    const loginAdmResponse = await request(app).post("/login").send(loginAdm);
    tokenAdm = loginAdmResponse.body.token;

    const signupAdmResponse2 = await request(app)
      .post("/users")
      .send(mockUserAdm2);
    const loginAdmResponse2 = await request(app).post("/login").send(loginAdm2);
    tokenAdm2 = loginAdmResponse2.body.token;

    const signupNoAdmResponse = await request(app)
      .post("/users")
      .send(mockUserNoAdm);
    const loginNoAdmResponse = await request(app)
      .post("/login")
      .send(loginNoAdm);
    tokenNoAdm = loginNoAdmResponse.body.token;

    const createEvent = await request(app)
      .post("/event")
      .send(eventCorrect)
      .set("Authorization", `Bearer ${tokenAdm}`);
    zoneCorret.eventId = createEvent.body.id;
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("Trying to create a zone with correct body", async () => {
    const response = await request(app)
      .post("/zones")
      .send(zoneCorret)
      .set("Authorization", `Bearer ${tokenAdm}`);
    zoneId = response.body.id;

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("price");
    expect(response.body).toHaveProperty("created_at");
    expect(response.body).toHaveProperty("event");
  });

  it("Trying to create a zone with different user from event creator", async () => {
    const response = await request(app)
      .post("/zones")
      .send(zoneCorret)
      .set("Authorization", `Bearer ${tokenAdm2}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message", "No permission allowed");
  });

  it("Trying to create a zone with correct body withouy being an adm", async () => {
    const response = await request(app)
      .post("/zones")
      .send(zoneCorret)
      .set("Authorization", `Bearer ${tokenNoAdm}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message", "User is not admin");
  });

  it("Trying to create a zone with correct body with no token", async () => {
    const response = await request(app).post("/zones").send(zoneCorret);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "No token found");
  });

  it("Trying to list all zones", async () => {
    const response = await request(app)
      .get("/zones")
      .set("Authorization", `Bearer ${tokenAdm}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("map");
  });

  it("Trying to list a zone", async () => {
    const response = await request(app)
      .get(`/zones/${zoneId}`)
      .set("Authorization", `Bearer ${tokenAdm}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("price");
    expect(response.body).toHaveProperty("created_at");
    expect(response.body).toHaveProperty("event");
  });

  it("Trying to update a zone", async () => {
    const response = await request(app)
      .patch(`/zones/${zoneId}`)
      .send(zoneUpdate)
      .set("Authorization", `Bearer ${tokenAdm}`);

    const responseGet = await request(app)
      .get(`/zones/${zoneId}`)
      .set("Authorization", `Bearer ${tokenAdm}`);

    expect(response.body).toHaveProperty("message", "Zone updated!");
    expect(responseGet.body).toHaveProperty("name", zoneUpdate.name);
    expect(responseGet.body).toHaveProperty("price", zoneUpdate.price);
    expect(responseGet.body).toHaveProperty(
      "total_tickets",
      zoneUpdate.total_tickets
    );
  });

  it("Trying to update a zone with eventId", async () => {
    const response = await request(app)
      .patch(`/zones/${zoneId}`)
      .send({ ...zoneUpdate, eventId: "teste" })
      .set("Authorization", `Bearer ${tokenAdm}`);

    expect(response.body).toHaveProperty(
      "message",
      "Cannot change eventId for a zone"
    );
  });

  it("Trying to delete a zone", async () => {
    const response = await request(app)
      .delete(`/zones/${zoneId}`)
      .set("Authorization", `Bearer ${tokenAdm}`);

    const responseGet = await request(app)
      .get(`/zones/${zoneId}`)
      .set("Authorization", `Bearer ${tokenAdm}`);

    expect(response.body).toHaveProperty("message", "Zone deleted!");
    expect(responseGet.body).toHaveProperty("status", "error");
  });
});
