import { describe, expect, test, beforeAll, afterAll, it } from "@jest/globals"
import { DataSource } from "typeorm"
import { AppDataSource } from "../../data-source"
import request from "supertest"
import app from "../../app"

const mockUserAdm = {
  name: "daniel",
  email: "daniel@kenzie.com",
  password: "1234",
  isAdm: true,
}

const loginAdm = {
  email: "daniel@kenzie.com",
  password: "1234",
}

const mockUserAdm2 = {
  name: "daniel",
  email: "daniel2@kenzie.com",
  password: "1234",
  isAdm: true,
}

const loginAdm2 = {
  email: "daniel2@kenzie.com",
  password: "1234",
}

const mockUserNoAdm = {
  name: "ugo",
  email: "ugo@kenzie.com",
  password: "1234",
  isAdm: false,
}

const loginNoAdm = {
  email: "ugo@kenzie.com",
  password: "1234",
}

const eventCorrect = {
  name: "Event1",
  description: "new event",
  date: "2025-07-07 17:01:18.410677",
}

let tokenAdm = ""
let tokenAdm2 = ""
let tokenNoAdm = ""

let eventId = ""

describe("Create a Event", () => {
  let connection: DataSource

  beforeAll(async () => {
    await AppDataSource.initialize().then((res) => (connection = res)).catch((err) => {
      console.log("Error during Data Source initialization: ", err)
    })

  const signupAdmResponse = await request(app)
      .post("/users")
      .send(mockUserAdm)

  const loginAdmResponse = await request(app).post("/login").send(loginAdm)
  tokenAdm = loginAdmResponse.body.token

  const signupAdmResponse2 = await request(app)
    .post("/users")
    .send(mockUserAdm2)

  const loginAdmResponse2 = await request(app).post("/login").send(loginAdm2)
  tokenAdm2 = loginAdmResponse2.body.token

  const signupNoAdmResponse = await request(app)
    .post("/users")
    .send(mockUserNoAdm)

  const loginNoAdmResponse = await request(app)
    .post("/login")
    .send(loginNoAdm)
    tokenNoAdm = loginNoAdmResponse.body.token
  })

  afterAll(async () => {
    await connection.destroy()
  })

  it("Trying to create an event with correct body", async () => {
    const response = await request(app)
      .post("/event")
      .send(eventCorrect)
      .set("Authorization", `Bearer ${tokenAdm}`)
      eventId = response.body.id

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty("name")
    expect(response.body).toHaveProperty("description")
    expect(response.body).toHaveProperty("date")
  })

  it("Trying to create an event with different user from event creator", async () => {
    const response = await request(app)
      .post("/event")
      .send(eventCorrect)
      .set("Authorization", `Bearer ${tokenAdm2}`)

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message", "No permission allowed");
  })

  it("Trying to create an event with correct body without being an adm", async () => {
    const response = await request(app)
      .post("/event")
      .send(eventCorrect)
      .set("Authorization", `Bearer ${tokenNoAdm}`)

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message", "User is not admin")
  });

  it("Trying to create an event with correct body with no token", async () => {
    const response = await request(app).post("/event").send(eventCorrect)

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "No token found")
  });

  it("Trying to list all events", async () => {
    const response = await request(app)
      .get("/event")
      .set("Authorization", `Bearer ${tokenAdm}`)

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("map")
  })

  it("Trying to update an event", async () => {
    const response = await request(app)
      .patch(`/events/${eventId}`)
      .set("Authorization", `Bearer ${tokenAdm}`)

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("map")
  })

  it("Trying to update an event with different user from event creator", async () => {
    const response = await request(app)
      .patch(`/events/${eventId}`)
      .send(eventCorrect)
      .set("Authorization", `Bearer ${tokenAdm2}`)

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message", "No permission allowed")
  })

  it("Trying to update an event that doesn't exist", async () => {
    const response = await request(app)
      .patch(`/events/${eventId}`)
      .send(eventCorrect)
      .set("Authorization", `Bearer ${tokenAdm2}`)

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message", "No permission allowed")
  })

  it("Trying to delete an event", async () => {
    const response = await request(app)
      .delete(`/events/${eventId}`)
      .set("Authorization", `Bearer ${tokenAdm}`)

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("map")
  })

  it("Trying to delete an event with different user from event creator", async () => {
    const response = await request(app)
      .delete(`/events/${eventId}`)
      .set("Authorization", `Bearer ${tokenAdm2}`)

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "No permission allowed")
  })

  it("Trying to delete an event that doesn't exist", async () => {
    const response = await request(app)
      .delete(`/events/${eventId}`)
      .set("Authorization", `Bearer ${tokenAdm2}`)

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "No permission allowed")
  })
})

// "id": "1a685894-84dd-461a-bfe4-826a84d19e73",
// "name": "Event014",
// "description": "um novo evento",
// "date": "2025-07-07T20:01:18.410Z",
// "user": "ce5b2d26-ba3a-4f90-94dd-e4ef919ce6e8",
// "created_at": "2022-07-15T15:26:02.867Z"