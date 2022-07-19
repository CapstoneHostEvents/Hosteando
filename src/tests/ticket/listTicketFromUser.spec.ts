import { DataSource, InitializedRelationError } from "typeorm";
import { AppDataSource } from "../../data-source";
import { describe, expect, test, it, beforeAll, afterAll } from "@jest/globals";

import { ITicketRequest } from "../../interfaces/ticket";
import { IUserRequest } from "../../interfaces/user";
import { IZoneCreate } from "../../interfaces/zone";
import { IEventRequest } from "../../interfaces/event";

import request from "supertest";
import app from "../../app";

describe("List tickets from user", () => {
  let connection: DataSource;

  let userData: any;
  let userData2: any;

  let token1: any;
  let token2: any;

  let zoneData: any;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Data Source initialization failed", err);
      });

    const user: IUserRequest = {
      name: "paulo",
      email: "paulo@gmail.com",
      password: "1234",
      isAdm: true,
    };
    const user2: IUserRequest = {
      name: "david",
      email: "david@gmail.com",
      password: "1234",
      isAdm: false,
    };

    userData = await (await request(app).post("/users").send(user)).body;
    userData2 = await (await request(app).post("/users").send(user2)).body;

    token1 = await (
      await request(app)
        .post("/login")
        .send({ email: user.email, password: user.password })
    ).body.token;
    token2 = await (
      await request(app)
        .post("/login")
        .send({ email: user2.email, password: user2.password })
    ).body.token;

    const event: IEventRequest = {
      name: "Rock in Rio",
      description: "Show of rock at Rio",
      date: userData.created_at,
    };
    const eventData = await (
      await request(app)
        .post("/events")
        .send(event)
        .set("Authorization", `Bearer ${token1}`)
    ).body;

    const zone: IZoneCreate = {
      name: "camarote",
      price: 200,
      total_tickets: 4,
      userId: userData.id,
      eventId: eventData.id,
    };
    zoneData = await (
      await request(app)
        .post("/zones")
        .send(zone)
        .set("Authorization", `Bearer ${token1}`)
    ).body;
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should list an empty array if user has no ticket", async () => {

    let response: request.Response = await request(app)
      .get(`/tickets/${userData.id}`)
      .set("Authorization", `Bearer ${token1}`);

    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(0);
    expect(Array.isArray(response.body)).toBe(true);

  });

  test("Should be able to list one ticket correctly", async () => {
    const ticket: ITicketRequest = {
      userId: userData.id,
      zoneId: zoneData.id,
    };

    let response: request.Response;
    await request(app)
      .post("/tickets")
      .send(ticket)
      .set("Authorization", `Bearer ${token1}`);

    response = await request(app)
      .get(`/tickets/${userData.id}`)
      .set("Authorization", `Bearer ${token1}`);

    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(1);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ...ticket,
          id: response.body[0].id,
          created_at: response.body[0].created_at,
        }),
      ])
    );

  });

  test("Should be able to list all tickets from user correctly", async () => {

    const ticket2: ITicketRequest = {
      userId: userData2.id,
      zoneId: zoneData.id,
    };

    let response: request.Response;
    await request(app)
      .post("/tickets")
      .send(ticket2)
      .set("Authorization", `Bearer ${token2}`);

    await request(app)
    .post("/tickets")
    .send(ticket2)
    .set("Authorization", `Bearer ${token2}`);

    response = await request(app)
      .get(`/tickets/${userData2.id}`)
      .set("Authorization", `Bearer ${token2}`);

    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(2);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ...ticket2,
          id: response.body[0].id,
          created_at: response.body[0].created_at,
        }),
        expect.objectContaining({
          ...ticket2,
          id: response.body[1].id,
          created_at: response.body[1].created_at,
        }),
      ])
    );

  });
});
