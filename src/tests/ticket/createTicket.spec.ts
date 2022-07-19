import { DataSource, InitializedRelationError } from "typeorm";
import { AppDataSource } from "../../data-source";
import { describe, expect, test, beforeAll, afterAll } from "@jest/globals";

import { ITicketRequest } from "../../interfaces/ticket";
import { IUserRequest } from "../../interfaces/user";
import { IZoneCreate } from "../../interfaces/zones";
import { IEventRequest } from "../../interfaces/events";

import  request from "supertest";
import app from "../../app";

describe("Create ticket", ()=>{

  let connection: DataSource;

  let userData: any;
  let userData2: any;

  let token1: any;
  let token2: any;

  let zoneData: any;

  beforeAll(async () => {
    await AppDataSource.initialize().then((res)=>{
      connection = res
    }).catch((err) => {
      console.error("Data Source initialization failed", err)
    })

    const user:IUserRequest = {
      name: "paulo",
      email: "paulo@gmail.com",
      password: "1234",
      isAdm: true
    }
    const user2:IUserRequest = {
      name: "david",
      email: "david@gmail.com",
      password: "1234",
      isAdm: false
    }

    userData = await (await request(app).post("/users").send(user)).body
    userData2 = await (await request(app).post("/users").send(user2)).body

    token1 = await (await request(app).post("/login").send({email: user.email, password: user.password})).body.token
    token2 = await (await request(app).post("/login").send({email: user2.email, password: user2.password})).body.token

    const event:IEventRequest = {
      name: "Rock in Rio",
      description: "Show of rock at Rio",
      date: userData.created_at,
    }
    const eventData = await (await request(app).post("/event").send(event).set("Authorization", `Bearer ${token1}`)).body
    
    const zone:IZoneCreate = {
      name: "camarote",
      price: 200,
      total_tickets: 4,
      userId: userData.id,
      eventId: eventData.id
    }
    zoneData = await (await request(app).post("/zones").send(zone).set("Authorization", `Bearer ${token1}`)).body

  })

  afterAll(async () => {
    await connection.destroy();
  })

  test("Should be able to create an ticket",async () => {
   
    const ticket: ITicketRequest = ({
      userId: userData.id,
      zoneId: zoneData.id
    })

    const response = await request(app).post('/tickets').send(ticket).set("Authorization", `Bearer ${token1}`);

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty("id")
    expect(response.body).toHaveProperty("userId")
    expect(response.body).toHaveProperty("zoneId")
    expect(response.body).toHaveProperty("created_at")
  })

  test("Should be able to create various tickets from different users",async () => {
   
    const ticket: ITicketRequest = ({
      userId: userData.id,
      zoneId: zoneData.id
    })
    const ticket2: ITicketRequest = ({
      userId: userData2.id,
      zoneId: zoneData.id
    })

    let response:request.Response;
    
    response = await request(app).post('/tickets').send(ticket).set("Authorization", `Bearer ${token1}`);

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty("id")
    expect(response.body).toHaveProperty("userId")
    expect(response.body).toHaveProperty("zoneId")
    expect(response.body).toHaveProperty("created_at")

    response = await request(app).post('/tickets').send(ticket2).set("Authorization", `Bearer ${token2}`);

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty("id")
    expect(response.body).toHaveProperty("userId")
    expect(response.body).toHaveProperty("zoneId")
    expect(response.body).toHaveProperty("created_at")

    response = await request(app).post('/tickets').send(ticket).set("Authorization", `Bearer ${token1}`);

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty("id")
    expect(response.body).toHaveProperty("userId")
    expect(response.body).toHaveProperty("zoneId")
    expect(response.body).toHaveProperty("created_at")
  })

  test("Don't allow creating more tickets than the zone total",async () => {
   
    const ticket: ITicketRequest = ({
      userId: userData.id,
      zoneId: zoneData.id
    })

    const response = await request(app).post('/tickets').send(ticket).set("Authorization", `Bearer ${token1}`);

    expect(response.status).toBe(409)
    expect(response.body.status).toBe("error")
    expect(response.body).toHaveProperty("message")
    expect(response.body.message).toBe("All tickets from this zone were already created")
  })

  test("Send an error message if user was not found",async () => {
   
    const ticket: ITicketRequest = ({
      userId: zoneData.id,
      zoneId: zoneData.id
    })

    const response = await request(app).post('/tickets').send(ticket).set("Authorization", `Bearer ${token1}`);

    expect(response.status).toBe(400)
    expect(response.body.status).toBe("error")
    expect(response.body).toHaveProperty("message")
    expect(response.body.message).toBe("User not found")

  })

  test("Send an error message if zone was not found",async () => {
   
    const ticket: ITicketRequest = ({
      userId: userData.id,
      zoneId: userData.id
    })

    const response = await request(app).post('/tickets').send(ticket).set("Authorization", `Bearer ${token1}`);

    expect(response.status).toBe(400)
    expect(response.body.status).toBe("error")
    expect(response.body).toHaveProperty("message")
    expect(response.body.message).toBe("Zone not found")

  })

})
