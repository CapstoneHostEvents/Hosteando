import { DataSource, InitializedRelationError } from "typeorm";
import { AppDataSource } from "../../data-source";
import { describe, expect, test, beforeAll, afterAll } from "@jest/globals";

import { ITicketRequest } from "../../interfaces/ticket";
import { IUserRequest } from "../../interfaces/user";
import { IZoneCreate } from "../../interfaces/zone";
import { IEventRequest } from "../../interfaces/event";

import request from "supertest";
import app from "../../app";

describe("Create ticket", () => {
  let connection: DataSource;

  let userData: any;
  let userData2: any;

  let token1: any;
  let token2: any;

  let ticketData: any;

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
      total_tickets: 5,
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

  test("Should be able to delete an ticket", async () => {
    const ticket: ITicketRequest = {
      userId: userData.id,
      zoneId: zoneData.id,
    };

    let response = await request(app)
      .post("/tickets")
      .send(ticket)
      .set("Authorization", `Bearer ${token1}`);

    expect(response.status).toBe(201);

    response = await request(app)
      .delete(`/tickets/${response.body.id}`)
      .set("Authorization", `Bearer ${token1}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Ticket deleted");

  });

  test("Should be able to delete multiple tickets from multiples users", async () => {
    let response;
    
    const ticket: ITicketRequest = {
      userId: userData.id,
      zoneId: zoneData.id,
    };

    const ticket2: ITicketRequest = {
      userId: userData2.id,
      zoneId: zoneData.id,
    };

    const ticketData1 = await request(app)
      .post("/tickets")
      .send(ticket)
      .set("Authorization", `Bearer ${token1}`);

    expect(ticketData1.status).toBe(201);

    const ticketData2 = await request(app)
      .post("/tickets")
      .send(ticket2)
      .set("Authorization", `Bearer ${token2}`);

    expect(ticketData2.status).toBe(201);

    response = await request(app)
      .delete(`/tickets/${ticketData1.body.id}`)
      .set("Authorization", `Bearer ${token1}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Ticket deleted");

    response = await request(app)
      .delete(`/tickets/${ticketData2.body.id}`)
      .set("Authorization", `Bearer ${token2}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Ticket deleted");

  });

  test("Should be able to create more tickets after deleting some", async () => {
    let response;
    
    const ticket: ITicketRequest = {
      userId: userData.id,
      zoneId: zoneData.id,
    };

    const ticket2: ITicketRequest = {
      userId: userData2.id,
      zoneId: zoneData.id,
    };

    response = await request(app)
      .post("/tickets")
      .send(ticket)
      .set("Authorization", `Bearer ${token1}`);

    expect(response.status).toBe(201);

    response = await request(app)
      .post("/tickets")
      .send(ticket2)
      .set("Authorization", `Bearer ${token2}`);

    expect(response.status).toBe(201);

    response = await request(app)
      .post("/tickets")
      .send(ticket2)
      .set("Authorization", `Bearer ${token2}`);

    expect(response.status).toBe(201);

    response = await request(app)
      .post("/tickets")
      .send(ticket)
      .set("Authorization", `Bearer ${token1}`);

    ticketData = response.body;

    expect(response.status).toBe(201);
  });

  test("Owner of events should be able to delete tickets from others users", async () => {
    const ticket2: ITicketRequest = {
      userId: userData2.id,
      zoneId: zoneData.id,
    };

    let response = await request(app)
      .post("/tickets")
      .send(ticket2)
      .set("Authorization", `Bearer ${token2}`);

    expect(response.status).toBe(201);

    response = await request(app)
      .delete(`/tickets/${response.body.id}`)
      .set("Authorization", `Bearer ${token1}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Ticket deleted");
  });

  test("Send an error message if token is invalid", async () => {
    const ticket2: ITicketRequest = {
      userId: userData2.id,
      zoneId: zoneData.id,
    };

    let response = await request(app)
      .post("/tickets")
      .send(ticket2)
      .set("Authorization", `Bearer ${token2}`);

    expect(response.status).toBe(201);

    response = await request(app)
      .delete(`/tickets/${response.body.id}`)

    expect(response.status).toBe(404);
    expect(response.body.status).toBe("error");
    expect(response.body).toHaveProperty("message");
  });

  test("Send an error message if ticket wasn't found", async () => {
    const response = await request(app)
      .delete(`/tickets/${userData.id}`)
      .set("Authorization", `Bearer ${token1}`);

    expect(response.status).toBe(404);
    expect(response.body.status).toBe("error");
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Ticket not found");
  });

  test("Send an error message if another user who didn't create the event or created the ticket tries to delete the ticket", async () => {

    const response = await request(app)
      .delete(`/tickets/${ticketData.id}`)
      .set("Authorization", `Bearer ${token2}`);

    expect(response.status).toBe(403);
    expect(response.body.status).toBe("error");
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Only the owner of ticket or owner of event can delete it");
  });

});
