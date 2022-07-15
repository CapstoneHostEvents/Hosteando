import { DataSource, InitializedRelationError } from "typeorm";
import { AppDataSource } from "../../data-source";
import { describe, expect, test, beforeAll, afterAll } from "@jest/globals";
import { ITicketRequest } from "../../interfaces/ticket";
import { IUser, IUserLogin, IUserRequest } from "../../interfaces/user";
import userCreateService from "../../services/user/userCreate.service";
// import userLoginService from "../../services/user/userLogin.service";
import { IEventRequest, IEventResponse } from "../../interfaces/events";
import { CreateEventService } from "../../services/event/createEvent.service";
import { IZoneCreate } from "../../interfaces/zones";
import CreateZoneService from "../../services/Zones/CreateZone.services";
import ticketCreateService from "../../services/ticket/ticketCreate.service";
import  request from "supertest";
import app from "../../app";

describe("Create ticket", ()=>{

  let connection: DataSource;
  let userData: IUser;
  let zoneData: any;
  // let token;

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
    // const userLogin:IUserLogin = {
    //   email: "paulo@gmail.com",
    //   password: "1234",
    // }

    userData = await userCreateService(user);
    // token = await userLoginService(userLogin);

    //create Event
    const event:IEventRequest = {
      name: "Rock in Rio",
      description: "Show of rock at Rio",
      date: userData.created_at,
      user: userData
    }

    const eventData = await CreateEventService(event)
    
    const zone:IZoneCreate = {
      name: "camarote",
      price: 200,
      total_tickets: 3,
      userId: userData.id,
      eventId: eventData.id
    }

    const createZone = new CreateZoneService()
    zoneData = await createZone.execute(zone);

  })

  afterAll(async () => {
    await connection.destroy();
  })

  test("Should be able to create an ticket",async () => {
   
    const ticket: ITicketRequest = ({
      userId: userData.id,
      zoneId: zoneData.id
    })

    const response = await request(app).post('/tickets').send(ticket);

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty("id")
    expect(response.body).toHaveProperty("userId")
    expect(response.body).toHaveProperty("zoneId")
    expect(response.body).toHaveProperty("created_at")
  })

  // didnt sent userId

  // didnt sent zoneId

})