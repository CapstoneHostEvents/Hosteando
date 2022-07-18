# API Documentation - Hosteando

## Contents

- [Overview](#1-overview)
- [ER Diagram](#2-er-diagram)
- [Quick Start](#3-quick-start)
  - [Installing Dependencies](#31-installing-dependencies)
  - [Environment variables](#32-environment-variables)
  - [Migrations](#33-migrations)
- [Endpoints](#4-endpoints)

---

## 1. Overview

Project overview, some of the technologies used.

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Yup](https://yarnpkg.com/package/yup)
- [Docker](https://www.docker.com/)

Application base URL:
https://hosteando.herokuapp.com/

---

## 2. ER Diagram

[ Back ](#contents)

API ER diagram defining relationships between database tables.

![DER](diagramER.png)

---

## 3. Quick Start

[ Back ](#contents)

### 3.1. Installing Dependencies

Clone the project on your machine and install the dependencies with the command:

```shell
yarn
```

### 3.2. Environment variables

Then, create a file **.env**, copying file format **.env.example**.
Configure your environment variables with your Postgres credentials.

Create database as data entered in **.env**.

Run:

```
yarn dev
```

### 3.3. Migrations

Run migrations with the command:

```
yarn typeorm migration:run -d src/data-source.ts
```

---

## 4. Endpoints

[ Back ](#contents)

### Índice

- [User](#41-user)
  - [POST - /users](#411-create-user)
  - [GET - /users](#412-list-all-users)
  - [GET - /users/<user_id>](#413-list-user-by-id)
  - [PATCH - /users/<user_id>](#414-update-user-data)
  - [DELETE - /users](#415-delete-user)
  - [POST - /login](#416-login)
- [Event](#42-event)
  - [POST - /event](#421-create-event)
  - [GET - /event](#422-list-all-events)
  - [PATCH - /event/<event_id>](#423-update-event)
  - [DELETE - /event/<event_id>](#424-delete-event)
- [Zone](#43-zone)
  - [POST - /zones](#431-create-zone)
  - [GET - /zones](#432-list-all-zones)
  - [GET - /zones/<zone_id>](#433-list-zone-by-id)
  - [GET - /zones/event/<event_id>](#434-list-all-zones-by-event)
  - [PATCH - /zone](#435-update-zone)
  - [DELETE - /zone](#436-delete-zone)
- [Ticket](#44-ticket)
  - [POST - /ticket](#441-buy-ticket)
  - [GET - /ticket](#442-list-all-tickets)
  - [GET - /ticket/me](#443-list-all-user-tickets)
  - [DELETE - /ticket](#444-delete-ticket)

---

## 4.1. **User**

[ Back to endpoints ](#4-endpoints)

The User object is defined as:

| Field      | Type    | Description                           |
| ---------- | ------- | ------------------------------------- |
| id         | string  | User's unique identifier              |
| name       | string  | Username                              |
| email      | string  | User's email                          |
| password   | string  | User access password                  |
| isAdm      | boolean | Defines if a user is an Administrator |
| created_at | string  | User creation date                    |
| update_at  | string  | User update date                      |

## Endpoints

| Method | Endpoint        | Responsability                                      |
| ------ | --------------- | --------------------------------------------------- |
| POST   | /users          | Create user                                         |
| GET    | /users          | List all users                                      |
| GET    | /users/<userId> | List the user with the corresponding id             |
| PATCH  | /users/<userId> | Update user data (needs token)                      |
| DELETE | /users/<userId> | Delete user from database (needs token)             |
| GET    | /login          | Receive e-mail and user's password, return an token |

---

### 4.1.1. **Create user**

[ Back to endpoints ](#4-endpoints)

### `/users`

### Example of request:

```
POST /users
Host: https://hosteando.herokuapp.com
Content-type: application/json
```

### Request body:

```json
{
  "name": "Ana",
  "email": "ana@mail.com",
  "password": "1234",
  "isAdm": true
}
```

### Example of response:

```
201 Created
```

```json
{
  "id": "8b3b6941-d65f-4e32-a8e0-89dfbd75a735",
  "name": "Ana",
  "email": "ana@mail.com",
  "password": "$2a$10$1DCOgkbxWcwE4rfOjIO8Z.2lqhmkVi5vhFHSfqkaAhTzC8WKzANk.",
  "isAdm": true,
  "created_at": "2022-07-14T19:01:11.951Z",
  "updated_at": "2022-07-14T19:01:11.951Z"
}
```

### Possible errors:

| Error code      | Description              |
| --------------- | ------------------------ |
| 400 bad request | Email already registered |

---

### 4.1.2. **List all users**

[ Back to endpoints ](#4-endpoints)

### `/users`

### Example of request:

```
GET /users
Host: https://hosteando.herokuapp.com
Authorization
Content-type: application/json
```

### Request body:

```json
Empty
```

### Example of response:

```
200 OK
```

```json
[
  {
    "id": "ab72896d-c542-4eed-bca0-6f388472b559",
    "name": "Maria",
    "email": "maria@mail.com",
    "password": "$2a$10$GfQKJ9J9ZluaLgj9CMoObebUPo4eKuchkUb2SWc/zmp54AyTOiL16",
    "created_at": "2022-07-14T18:06:53.061Z",
    "updated_at": "2022-07-14T18:06:53.061Z",
    "isAdm": false
  },
  {
    "id": "8b3b6941-d65f-4e32-a8e0-89dfbd75a735",
    "name": "Ana",
    "email": "ana@mail.com",
    "password": "$2a$10$1DCOgkbxWcwE4rfOjIO8Z.2lqhmkVi5vhFHSfqkaAhTzC8WKzANk.",
    "created_at": "2022-07-14T19:01:11.951Z",
    "updated_at": "2022-07-14T19:01:11.951Z",
    "isAdm": true
  }
]
```

### Possible errors:

None, the maximum that can return an empty list.

---

### 4.1.3. **List user by id**

[ Back to endpoints ](#4-endpoints)

### `/users/<userId>`

### Example of request:

```
GET /users/<userId>
Host: https://hosteando.herokuapp.com
Content-type: application/json
```

### Request parameters:

| Parameter | Type   | Description              |
| --------- | ------ | ------------------------ |
| userId    | string | User's unique identifier |

### Request body:

```json
Empty
```

### Example of response:

```
200 OK
```

```json
{
  "id": "8b3b6941-d65f-4e32-a8e0-89dfbd75a735",
  "name": "Ana",
  "email": "ana@mail.com",
  "password": "$2a$10$1DCOgkbxWcwE4rfOjIO8Z.2lqhmkVi5vhFHSfqkaAhTzC8WKzANk.",
  "created_at": "2022-07-14T19:01:11.951Z",
  "updated_at": "2022-07-14T19:01:11.951Z",
  "isAdm": true
}
```

### Possible errors:

| Error code | Description    |
| ---------- | -------------- |
| 404        | User not found |

---

### 4.1.4. **Update user data**

[ Back to endpoints ](#4-endpoints)

### `/users/<userId>`

### Example of request:

```
PATCH /users<userId>
Host: https://hosteando.herokuapp.com
Authorization
Content-type: application/json+
```

### Request parameters:

| Parameter | Type   | Description              |
| --------- | ------ | ------------------------ |
| userId    | string | User's unique identifier |

### Request body:

```json
{
  "name": "Ana Paula"
}
```

### Example of response:

```
200 OK
```

```json
{
  "message": "User updated!"
}
```

### Possible errors:

| Error code | Description    |
| ---------- | -------------- |
| 404        | User not found |

---

### 4.1.5. **Delete user**

[ Back to endpoints ](#4-endpoints)

### `/users/<userId>`

### Example of request:

```
DELETE /users/<userId>
Host: https://hosteando.herokuapp.com
Authorization
Content-type: application/json
```

### Request parameters:

| Parameter | Type   | Description              |
| --------- | ------ | ------------------------ |
| userId    | string | User's unique identifier |

### Request body:

```json
Empty
```

### Example of response:

```
200 OK
```

```json
{
  "message": "User deleted!"
}
```

### Possible errors:

| Error code | Description    |
| ---------- | -------------- |
| 404        | User not found |

---

### 4.1.6. **Login**

[ Back to endpoints ](#4-endpoints)

### `/login`

### Example of request:

```
GET /login
Host: https://hosteando.herokuapp.com
Content-type: application/json
```

### Request body:

```json
{
  "email": "ana@mail.com",
  "password": 1234
}
```

### Example of response:

```
201 Created
```

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg2ZTFhNjU5LWZjNDktNGM1ZS1iMmU0LWVlMjg2ZTRjOTAxZiIsImlhdCI6MTY0NzA5NzYyOSwiZXhwIjoxNjQ3MTg0MDI5fQ"
}
```

### Possible errors:

| Error code    | Description                 |
| ------------- | --------------------------- |
| 403 Forbidden | Email or password incorrect |

---

## 4.2. **Event**

[ Back to endpoints ](#4-endpoints)

The Event object is defined as:

| Field       | Type   | Description                    |
| ----------- | ------ | ------------------------------ |
| id          | string | Event's unique identifier      |
| name        | string | Username                       |
| description | string | Description of the event       |
| date        | string | Date of the event              |
| created_by  | string | Admin responsible for creating |
| created_at  | string | Event creation date            |

## Endpoints

| Method | Endpoint | Responsability  |
| ------ | -------- | --------------- |
| POST   | /event   | Create event    |
| GET    | /event   | List all events |
| PATCH  | /event   | Update event    |
| DELETE | /event   | Delete event    |

---

### 4.2.1. **Create event**

[ Back to endpoints ](#4-endpoints)

### `/event`

### Example of request:

```
POST /event
Host: https://hosteando.herokuapp.com
Authorization
Content-type: application/json
```

### Request body:

```json
{
  "name": "Rock in Rio",
  "description": "Festival de música e entretenimento",
  "date": "2025-07-07 17:01:18.410677""
}
```

### Example of response:

```
201 Created
```

```json
{
  "id": "c1e4d222-3e5d-45de-94b5-1656112d9046",
  "name": "Rock in Rio",
  "description": "Festival de música e entretenimento",
  "date": "2025-07-07T20:01:18.410Z",
  "created_at": "2022-07-14T19:27:02.905Z"
}
```

### Possible errors:

| Error code      | Description               |
| --------------- | ------------------------- |
| 400 bad request | This event already exists |

---

### 4.2.2. **List all events**

[ Back to endpoints ](#4-endpoints)

### `/event`

### Example of request:

```
GET /event
Host: https://hosteando.herokuapp.com
Content-type: application/json
```

### Request body:

```json
Empty
```

### Example of response:

```
200 OK
```

```json
[
  {
    "id": "9cda28c9-e540-4b2c-bf0c-c90006d37893",
    "name": "Rock in Rio",
    "description": "Festival de música e entretenimento",
    "date": "2022-09-12 18:00:23",
    "created_at": "2022-07-12 12:48:23"
  },

  {
    "id": "9c251ec9-ece0-4ejnf2c-c9001ef1ewwfe93",
    "name": "Lollapalooza",
    "description": "Festival de música e entretenimento",
    "date": "2022-12-12 18:00:23",
    "created_at": "2022-07-12 12:48:23"
  }
]
```

### Possible errors:

None, the maximum that can return an empty list.

---

## 4.3. **Zone**

[ Back to endpoints ](#4-endpoints)

The Zone object is defined as:

| Field         | Type   | Description                       |
| ------------- | ------ | --------------------------------- |
| id            | string | Zone's unique identifier          |
| name          | string | Username                          |
| price         | number | Ticket value in the zone          |
| total_tickets | number | Total number of tickets available |
| eventId       | string | Relationship with event id        |

## Endpoints

| Method | Endpoint              | Responsability                          |
| ------ | --------------------- | --------------------------------------- |
| POST   | /zone                 | Create zone                             |
| GET    | /zone                 | List all zones                          |
| GET    | /zone/<zone_id>        | List the zone with the corresponding id |
| GET    | /zone/event/<event_id> | List all zones from of an event         |
| PATCH  | /zone                 | Update zone info                        |
| DELETE | /zone                 | Delete zone                             |

---

### 4.3.1. **Create zone**

[ Back to endpoints ](#4-endpoints)

### `/zones`

### Example of request:

```
POST /zones
Host: https://hosteando.herokuapp.com
Authorization
Content-type: application/json
```

### Request body:

```json
{
  "name": "Camarote",
  "price": 420.0,
  "total_tickets": 850,
  "eventId": "c1e4d222-3e5d-45de-94b5-1656112d9046"
}
```

### Example of response:

```
201 Created
```

```json
{
  "id": "5f16462e-b084-4484-8ebf-2ec6247bee1c",
  "name": "Camarote",
  "price": 420,
  "total_tickets": 850,
  "event": {
    "id": "c1e4d222-3e5d-45de-94b5-1656112d9046",
    "name": "Rock in Rio",
    "description": "Festival de música e entretenimento",
    "date": "2025-07-07T20:01:18.410Z",
    "created_at": "2022-07-14T19:27:02.905Z"
  },
  "created_at": "2022-07-14T19:32:48.406Z"
}
```

### Possible errors:

| Error code      | Description                       |
| --------------- | --------------------------------- |
| 400 bad request | Name alrealdy used for that event |

---

### 4.3.2. **List all zones**

[ Back to endpoints ](#4-endpoints)

### `/zones`

### Example of request:

```
GET /zones
Host: https://hosteando.herokuapp.com
Content-type: application/json
```

### Request body:

```json
Empty
```

### Example of response:

```
200 OK
```

```json
[
  {
    "id": "5f16462e-b084-4484-8ebf-2ec6247bee1c",
    "name": "Camarote",
    "price": 420,
    "total_tickets": 850,
    "created_at": "2022-07-14T19:32:48.406Z",
    "event": {
      "id": "c1e4d222-3e5d-45de-94b5-1656112d9046",
      "name": "Rock in Rio",
      "description": "Festival de música e entretenimento",
      "date": "2025-07-07T20:01:18.410Z",
      "created_at": "2022-07-14T19:27:02.905Z"
    }
  },
  {
    "id": "5sc1e5f2e-f52w-8926-6d8f-2c98d1v5df51c",
    "name": "Pista",
    "price": 90,
    "total_tickets": 6900,
    "created_at": "2022-07-14T19:32:48.406Z",
    "event": {
      "id": "c1e4d222-3e5d-45de-94b5-1656112d9046",
      "name": "Rock in Rio",
      "description": "Festival de música e entretenimento",
      "date": "2025-07-07T20:01:18.410Z",
      "created_at": "2022-07-14T19:27:02.905Z"
    }
  }
]
```

### Possible errors:

None, the maximum that can return an empty list.

---

### 4.3.3. **List zone by id**

[ Back to endpoints ](#4-endpoints)

### `/zones/<zoneId>`

### Example of request:

```
GET /zone/<zoneId>
Host: https://hosteando.herokuapp.com
Content-type: application/json
```

### Request parameters:

| Parameter | Type   | Description              |
| --------- | ------ | ------------------------ |
| zoneId    | string | Zone's unique identifier |

### Request body:

```json
Empty
```

### Example of response:

```
200 OK
```

```json
{
  "id": "5f16462e-b084-4484-8ebf-2ec6247bee1c",
  "name": "Camarote",
  "price": 420,
  "total_tickets": 850,
  "created_at": "2022-07-14T19:32:48.406Z",
  "event": {
    "id": "c1e4d222-3e5d-45de-94b5-1656112d9046",
    "name": "Rock in Rio",
    "description": "Festival de música e entretenimento",
    "date": "2025-07-07T20:01:18.410Z",
    "created_at": "2022-07-14T19:27:02.905Z"
  }
}
```

### Possible errors:

| Error code | Description    |
| ---------- | -------------- |
| 404        | Zone not found |

---

### 4.3.4. **List all zones by event**

[ Back to endpoints ](#4-endpoints)

### `/zone/event/<eventId>`

### Example of request:

```
GET /zone/event/<eventId>
Host: https://hosteando.herokuapp.com
Content-type: application/json
```

### Request parameters:

| Parameter | Type   | Description               |
| --------- | ------ | ------------------------- |
| eventId   | string | Event's unique identifier |

### Request body:

```json
Empty
```

### Example of response:

```
200 OK
```

```json
[
  {
    "id": "5f16462e-b084-4484-8ebf-2ec6247bee1c",
    "name": "Camarote",
    "price": 420,
    "total_tickets": 850,
    "created_at": "2022-07-14T19:32:48.406Z",
    "event": {
      "id": "c1e4d222-3e5d-45de-94b5-1656112d9046",
      "name": "Rock in Rio",
      "description": "Festival de música e entretenimento",
      "date": "2025-07-07T20:01:18.410Z",
      "created_at": "2022-07-14T19:27:02.905Z"
    }
  },
  {
    "id": "5sc1e5f2e-f52w-8926-6d8f-2c98d1v5df51c",
    "name": "Pista",
    "price": 90,
    "total_tickets": 6900,
    "created_at": "2022-07-14T19:32:48.406Z",
    "event": {
      "id": "c1e4d222-3e5d-45de-94b5-1656112d9046",
      "name": "Rock in Rio",
      "description": "Festival de música e entretenimento",
      "date": "2025-07-07T20:01:18.410Z",
      "created_at": "2022-07-14T19:27:02.905Z"
    }
  }
]
```

### Possible errors:

| Error code | Description     |
| ---------- | --------------- |
| 404        | Event not found |

---

## 4.4. **Ticket**

[ Back to endpoints ](#4-endpoints)

The Ticket object is defined as:

| Field      | Type   | Description                |
| ---------- | ------ | -------------------------- |
| id         | string | Ticket's unique identifier |
| zoneId     | string | Relationship with zone id  |
| userId     | number | Relationship with user id  |
| created_at | number | Event creation date        |

## Endpoints

| Method | Endpoint | Responsability            |
| ------ | -------- | ------------------------- |
| POST   | /tickets  | Buy an ticket             |
| GET    | /tickets  | List all tickets          |
| GET    | /tickets  | List all the user tickets |
| DELETE | /tickets  | Delete ticket             |

---

### 4.4.1. **Buy ticket**

[ Back to endpoints ](#4-endpoints)

### `/tickets`

### Example of request:

```
POST /tickets
Host: https://hosteando.herokuapp.com
Authorization
Content-type: application/json
```

### Request body:

```json
{
  "userId": "d124c708-9654-4216-96d7-1b8bd8b424d5",
  "zoneId": "5f16462e-b084-4484-8ebf-2ec6247bee1c"
}
```

### Example of response:

```
201 Created
```

```json
{
  "id": "b49ad6af-66f0-4d33-a68b-9c2729897d86",
  "created_at": "2022-07-15T14:06:45.088Z",
  "userId": "d124c708-9654-4216-96d7-1b8bd8b424d5",
  "zoneId": "5f16462e-b084-4484-8ebf-2ec6247bee1c"
}
```

### Possible errors:

| Error code      | Description                                     |
| --------------- | ----------------------------------------------- |
| 409 bad request | All tickets from this zone were already created |

---

### 4.4.2. **List all tickets**

[ Back to endpoints ](#4-endpoints)

### `/tickets`

### Example of request:

```
GET /tickets
Host: https://hosteando.herokuapp.com
Authorization
Content-type: application/json
```

### Request body:

```json
Empty
```

### Example of response:

```
200 OK
```

```json
[
  {
    "id": "b49ad6af-66f0-4d33-a68b-9c2729897d86",
    "created_at": "2022-07-15T14:06:45.088Z"
  }
]
```

### Possible errors:

None, the maximum that can return an empty list.

---
