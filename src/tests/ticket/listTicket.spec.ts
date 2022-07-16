import { DataSource, InitializedRelationError } from "typeorm";
import { AppDataSource } from "../../data-source";
import { describe, expect, test, beforeAll, afterAll } from "@jest/globals";

import {  ITicketRequest } from "../../interfaces/ticket";
import { IUser, IUserRequest } from "../../interfaces/user";
import { IZoneCreate } from "../../interfaces/zones";
import { IEventRequest, IEventResponse } from "../../interfaces/events";

import userCreateService from "../../services/user/userCreate.service";
import { CreateEventService } from "../../services/event/createEvent.service";
import CreateZoneService from "../../services/Zones/CreateZone.services";

import  request from "supertest";
import app from "../../app";

describe("Create ticket", ()=>{

  let connection: DataSource;
  let userData: IUser;
  let userData2: IUser;
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
    userData = await userCreateService(user);
    userData2 = await userCreateService(user2);

    const event:IEventRequest = {
      name: "Rock in Rio",
      description: "Show of rock at Rio",
      date: userData.created_at,
      user: userData
    }
    const eventData:IEventResponse = await CreateEventService(event)
    
    const zone:IZoneCreate = {
      name: "camarote",
      price: 200,
      total_tickets: 4,
      userId: userData.id,
      eventId: eventData.id
    }
    const createZone = new CreateZoneService()
    zoneData = await createZone.execute(zone);

  })

  afterAll(async () => {
    await connection.destroy();
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
    await request(app).post('/tickets').send(ticket);
  
    response = await request(app).get('/tickets');

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

    await request(app).post('/tickets').send(ticket2);

    response = await request(app).get('/tickets');

    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(2);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
            ...ticket,
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

  })

})