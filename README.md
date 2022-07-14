# API Documentation - Hosteando

## Contents

- [Overview](#1-visão-geral)
- [ER Diagram](#2-diagrama-er)
- [Quick Start](#3-início-rápido)
  - [Installing Dependencies](#31-instalando-dependências)
  - [Environment variables](#32-variáveis-de-ambiente)
  - [Migrations](#33-migrations)
- [Endpoints](#5-endpoints)

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
  - [POST - /user](#411-create-user)
  - [GET - /user](#412-list-all-users)
  - [GET - /user/me](#413-list-user-by-id)
  - [PATCH - /user](#414-update-user-data)
  - [DELETE - /user](#415-delete-user)
  - [POST - /user/login](#416-login-user)
- [Event](#42-event)
  - [POST - /event](#421-create-event)
  - [GET - /event](#422-list-all-events)
  - [PATCH - /event/<event_id>](#423-update-event)
  - [DELETE - /event/<event_id>](#424-delete-event)
- [Zone](#43-zone)
  - [POST - /zone](#431-create-zone)
  - [GET - /zone](#432-list-all-zones)
  - [GET - /zone/<event_id>](#433-list-all-zones-by-event)
  - [PATCH - /zone](#434-update-zone)
  - [DELETE - /zone](#435-delete-zone)
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

| Method | Endpoint    | Responsability                                      |
| ------ | ----------- | --------------------------------------------------- |
| POST   | /user       | Create user                                         |
| GET    | /user       | List all users                                      |
| GET    | /user/me    | List the user with the corresponding id             |
| PATCH  | /user       | Update user data (needs token)                      |
| DELETE | /user       | Delete user from database (needs token)             |
| GET    | /user/login | Receive e-mail and user's password, return an token |

---

### 4.1.1. **Create user**

[ Back to endpoints ](#4-endpoints)

### `/user`

### Example of request:

```
POST /user
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
  "id": "9cda28c9-e540-4b2c-bf0c-c90006d37893",
  "name": "Ana",
  "email": "ana@mail.com",
  "isAdm": true,
  "created_at": "2022-07-12 10:00:01"
}
```

### Possible errors:

| Error code      | Description              |
| --------------- | ------------------------ |
| 400 bad request | Email already registered |

---

### 4.1.2. **List all users**

[ Back to endpoints ](#5-endpoints)

### `/user`

### Example of request:

```
GET /user
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
    "name": "Ana",
    "email": "ana@mail.com",
    "isAdm": true
  },

  {
    "id": "8mhtd28c4-e540-2w9r-ipa7-j86346d10986",
    "name": "Maria",
    "email": "maria@mail.com",
    "isAdm": false
  }
]
```

### Possible errors:

None, the maximum that can return an empty list.

---

### 4.1.3. **List the user with the corresponding id**

[ Back to endpoints ](#4-endpoints)

### `/user/me`

### Example of request:

```
GET /users/me
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
  "id": "9cda28c9-e540-4b2c-bf0c-c90006d37893",
  "name": "Ana",
  "email": "ana@mail.com",
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

### `/user`

### Example of request:

```
PATCH /user
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
{
  "id": "9cda28c9-e540-4b2c-bf0c-c90006d37893",
  "name": "Ana Paula",
  "email": "ana@mail.com",
  "isAdm": true,
  "update_at": "2022-07-12 12:48:23"
}
```

### Example of response:

```
200 OK
```

```json
{
  "id": "9cda28c9-e540-4b2c-bf0c-c90006d37893",
  "name": "Ana Paula",
  "email": "ana@mail.com",
  "isAdm": true
}
```

### Possible errors:

| Error code | Description    |
| ---------- | -------------- |
| 404        | User not found |

---

### 4.1.5. **Delete user from database**

[ Back to endpoints ](#4-endpoints)

### `/user`

### Example of request:

```
DELETE /user
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

### Possible errors:

| Error code | Description    |
| ---------- | -------------- |
| 404        | User not found |

---

### 4.1.6. **Login**

[ Back to endpoints ](#4-endpoints)

### `/user/login`

### Example of request:

```
GET /user/login
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

---

## 4.3. **Zone**

[ Back to endpoints ](#4-endpoints)

The Zone object is defined as:

| Field         | Type   | Description              |
| ------------- | ------ | ------------------------ |
| id            | string | Zone's unique identifier |
| name          | string | Username                 |
| price         | number |                          |
| total_tickets | number |                          |
| eventId       | string |                          |

## Endpoints

| Method | Endpoint               | Responsability                          |
| ------ | ---------------------- | --------------------------------------- |
| POST   | /zone                  | Create zone                             |
| GET    | /zone                  | List all zones                          |
| GET    | /zone/<zone_id>        | List the zone with the corresponding id |
| GET    | /zone/event/<event_id> | List all zones from of an event         |
| PATCH  | /zone                  | Update zone info                        |
| DELETE | /zone                  | Delete zone                             |

---

## 4.4. **Ticket**
