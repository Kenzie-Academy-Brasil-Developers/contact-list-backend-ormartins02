<h1 align ='center'> <strong>API Documentation<strong> </h1>

## **Content Table**

- [1. Overview](#1-overview)
- [2. Entity Relationship Diagram](#2-entity-relationship-diagram)
- [3. Endpoints](#3-endpoints)
- [4. Authetication](#4-authentication)

<br>

---

## **1. Overview**

CineExpress is an API for cinema, created as a final project of Module 4 at Kenzie Academy Brasil.

These were the main technologies used in this project:

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Jest](https://jestjs.io/)

**Base URL: https://cine-express-projeto-m4.herokuapp.com**

### **Team**

> - [Thiago A. Scherer](https://www.linkedin.com/in/thiago-araujo-scherer/) - SM
> - [Larissa Sato](https://www.linkedin.com/in/larissa-sato-51a835222/) - TL
> - [Amon Fanticelli](https://www.linkedin.com/in/amon-fanticelli/) - PO
> - [Ricardo Martins](https://www.linkedin.com/in/ormartins02/) - Dev
> - [Leandro Junges](https://www.linkedin.com/in/leandro-junges/) - Dev
> - [João Victor](https://www.linkedin.com/in/joao-victor-lemos/) - Dev

<br>

## **2. Entity Relationship Diagram**

[ Back to the top ](#content-table)

![Diagram](diagram_api_cine.png)

<br>

## **3. Endpoints**

[Back to the top](#content-table)

### Index

- [Users](#1-users)
- [Payment](#2-payments)
- [Cinema](#3-cinema)
- [Movies](#4-movies)
- [Rooms](#5-rooms)
- [Session](#6-sessions)
- [Tickets](#7-tickets)

<br>

## **4. Authentication**

[ Back to the top ](#content-table)

Some routes need authentication. The authentication used is the **Bearer Token** type.

The token is generated automatically at **user login**.

Thus, to access routes with authentication, it is necessary to have a user and be logged in with the user.

In addition, some routes require the user to be an administrator, or owner of the account, or employee

Please read each route's documentation to understand which authentications are required.

---

#

<br>

## **1.** **USERS**

[Back to Endpoints](#3-endpoints)

<br>

The User object is defined as:

| Field      | Type     | Description                                       |
| ---------- | -------- | ------------------------------------------------- |
| id         | string   | User's unique identifier                          |
| name       | string   | User name \*                                      |
| email      | string   | User email \*                                     |
| isAdm      | boolean  | Defines whether a user is an administrator or not |
| isActive   | boolean  | Defines whether a user is active or not           |
| createdAt  | string   | Date when the user was created                    |
| updatedAt  | string   | Date when the user was updated                    |
| password   | string   | User password \*                                  |
| isEmployee | boollean | Define wheater a user is an employee or not       |

<br>

<br>

### **Endpoints**

<br>

| Method | Routes      | Description                              |
| ------ | ----------- | ---------------------------------------- |
| POST   | /users      | Create user                              |
| POST   | /login      | Login user                               |
| GET    | /users      | List all users                           |
| GET    | /users/:id  | Lists a user using its ID as a parameter |
| PATCH  | /user/:id   | Update user                              |
| DELETE | /delete/:id | Soft delete user                         |

---

<br>

## **1.1 User Creation**

[Back to Endpoints](#3-endpoints)

<br>

## POST `/users`

<br>

### **Request**:

- POST /users
- Host: https://cine-express-projeto-m4.herokuapp.com
- Authorization: None
- Content-type: application/json

<br>

### **Request body**:

```json
{
  "name": "Thiago",
  "email": "thiago@mail.com",
  "isAdm": true,
  "contact": "xx 9xxxx xxxx",
  "birthDate": "2000/01/01",
  "isEmployee": false,
  "password": "1234"
}
```

<br>

### **Expected Response**:

<br>

#### **Status `201 - CREATED`**

```json
{

  {
    "id": "f1719800-2e5a-4270-88de-64380f73dd3d",
    "name": "Thiago",
    "bithDate": "2000/01/01",
    "isAdm": true,
    "isEmployee": false,
    "contact" : "99988866677",
    "email": "thiago@mail.com",
    "isActive": true,
    "createdAt": "2022-10-29T00:41:28.717Z",
    "updatedAt": "2022-10-29T00:41:28.717Z"
  }
}
```

<br>

### **Error Responses**:

<br>

#### **Status `400 - BAD REQUEST`** - Missing required field

```json
{
  "message": "(any object key) is a required field"
}
```

<br>

#### **Status `409 - CONFLICTS`** - Email already exists

```json
{
  "message": "This email already exists"
}
```

#

## **1.2 Login**

[Back to Endpoints](#3-endpoints)

<br>

## SIGN `/login`

<br>

### **Request**

- SIGN /login
- Host: https://cine-express-projeto-m4.herokuapp.com
- Authorization: None
- Content-type: application/json
- User must be created

<br>

### **Request body**:

```json
{
  "email": "thiago@mail.com",
  "password": "1234"
}
```

<br>

### **Expected Response**:

<br>

#### **Status `200 - OK`**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbSI6dHJ1ZSwiaXNFbXBsb3llZSI6dHJ1ZSwiaWF0IjoxNjY3OTY0MDY2LCJleHAiOjE2NjgwNTA0NjYsInN1YiI6ImE4M2MxMjVjLWNjZjctNDA4NC04NTg1LWFhZDYyMWZiMjY5MSJ9.LHflvucPDWutAUSUa-O9NY516Y1s5bNVnVtdKPsu89k"
}
```

### **Error Response**:

<br>

#### **Status `403 - FORBIDDEN`** - "Invalid user or password"

```json
{
  "message": "Invalid user or password"
}
```

#

## **1.3 List Users**

[Back to Endpoints](#3-endpoints)

<br>

## GET `/users`

<br>

### **Request**:

- GET /users
- Host: https://cine-express-projeto-m4.herokuapp.com
- Authorization: Bearer Token
- Content-type: application/json
- Empty body
- User must be an Adm

<br>

### **Request headers**:

```json
{
  "authorization": "Bearer Token"
}
```

<br>

### **Expected Response**:

<br>

#### **Status `200 - OK`**

```json
{

   [
    {
      "id": "f1719800-2e5a-4270-88de-64380f73dd3d",
      "name": "Thiago",
      "bithDate": "2000/01/01",
      "isAdm": true,
      "isEmployee": false,
      "contact" : "99988866677",
      "email": "thiago@mail.com",
      "isActive": true,
      "createdAt": "2022-10-29T00:41:28.717Z",
      "updatedAt": "2022-10-29T00:41:28.717Z"
    }
    ...
  ]
}
```

<br>

### **Error Responses**:

<br>

#### **Status `401 - UNAUTHORIZED`** - "Missing authorization token"

```json
{
  "message": "Missing authorization token"
}
```

<br>

#### **Status `403 - UNAUTHORIZED`** - "User is not an admin"

```json
{
  "message": "User is not an admin"
}
```

#

## **1.4 List User by Id**

[Back to Endpoints](#3-endpoints)

<br>

## GET `/users/:id`

<br>

### **Request**:

- GET /users/:id
- Host: https://cine-express-projeto-m4.herokuapp.com
- Authorization: Bearer Token
- Content-type: application/json
- Empty body
- User must be an Adm or employee

<br>

### **Request headers**:

```json
{
  "authorization": "Bearer Token"
}
```

<br>

### **Expected Response**:

<br>

#### **Status `200 - OK`**

```json
{

   [
    {
      "id": "f1719800-2e5a-4270-88de-64380f73dd3d",
      "name": "Thiago",
      "email": "thiago@mail.com",
      "isAdm": true,
      "isActive": true,
      "createdAt": "",
      "updatedAt": ""
    }
    ...
  ]
}
```

<br>

### **Error Responses**:

<br>

#### **Status `401 - UNAUTHORIZED`** - "Missing authorization token"

```json
{
  "message": "Missing authorization token"
}
```

<br>

#### **Status `403 - FORBIDDEN`** - "User is not an admin and employee"

```json
{
  "message": "User is not an admin"
}
or
{
  "message": "User is not employee
}
```

#

## **1.5 Update User by Id**

[Back to Endpoints](#3-endpoints)

<br>

## PATCH `/users/:id`

<br>

### **Request**:

- PATCH /users/:id
- Host: https://cine-express-projeto-m4.herokuapp.com
- Authorization: Bearer Token
- Content-type: application/json
- User must be an Adm and employee

<br>

### **Request headers**:

```json
{
  "authorization": "Bearer Token"
}
```

<br>

### **Expected Response**:

<br>

#### **Status `200 - OK`**

```json
{

  {
    "name": "Thiago",
    "birthDate": "2000/01/01",
    "contact" : "99988866677",
    "email": "thiago@mail.com",
  }
}
```

<br>

### **Error Responses**:

<br>

#### **Status `401 - UNAUTHORIZED`** - "Missing authorization token"

```json
{
  "message": "Missing authorization token"
}
```

<br>

#### **Status `403 - FORBIDDEN`** - "User is not an admin and employee"

```json
{
  "message": "User is not an admin"
}
or
{
  "message": "User is not employee
}
```

#

## **1.6 Delete User by Id**

[Back to Endpoints](#3-endpoints)

<br>

## DELETE `/users/:id`

<br>

### **Request**:

- DELETE /users/:id
- Host: https://cine-express-projeto-m4.herokuapp.com
- Authorization: Bearer Token
- Content-type: application/json
- User must be an Adm and employee

<br>

### **Request headers**:

```json
{
  "authorization": "Bearer Token"
}
```

<br>

### **Expected Response**:

<br>

#### **Status `204 - No Content`**

```json
No body returned for response
```

<br>

### **Error Responses**:

<br>

#### **Status `401 - UNAUTHORIZED`** - "Missing authorization token"

```json
{
  "message": "Missing authorization token"
}
```

<br>

#### **Status `403 - FORBIDDEN`** - "User is not an admin and employee"

```json
{
  "message": "User is not an admin"
}
or
{
  "message": "User is not employee"
}
```

### **Status `400 - Bad Request`** - "User already deleted"

```json
{
  "message": "User already deleted"
}
```

### **Status `404 - Not Found`** - "User not found id invalid"

```json
{
  "message": "User not found"
}
```

#

## **2.** **Payments**

[Back to Endpoints](#3-endpoints)

<br>

The Payments object is defined as:

| Field   | Type   | Description                                   |
| ------- | ------ | --------------------------------------------- |
| id      | string | Payment unique identifier                     |
| name    | string | User name                                     |
| number  | string | Card number                                   |
| dueDate | string | Expiration date of this credit card           |
| code    | string | Security code of credit card                  |
| userId  | string | Define wich user is reference to this payment |

<br>

### **Endpoints**

<br>

| Method | Routes           | Description                                             |
| ------ | ---------------- | ------------------------------------------------------- |
| POST   | /paymentInfo     | To create a new payment data                            |
| PATCH  | /paymentInfo/:id | To update the data payment using id user as a parameter |
| GET    | /paymentInfo     | To list all payment data this user logged               |
| GET    | /paymentInfo/:id | To list data payment using the id user as a parameter   |
| DELETE | /paymentInfo/:id | To delete a data payment using id user as a parameter   |

---

<br>

## **2.1 Data Payment Creation**

[Back to Endpoints](#5-endpoints)

<br>

## POST `/paymentInfo`

<br>

### **Request**:

- POST /paymentInfo
- Host: https://cine-express-projeto-m4.herokuapp.com/paymentInfo
- Authorization: Bearer Token
- Content-type: application/json

<br>

### **Request body**:

```json
{
  "name": "Joana",
  "number": "1326598745632156",
  "dueDate": "2023-06",
  "code": "963",
  "userId": "e64c6322-2a32-41be-8be9-37da17161ee2"
}
```

<br>

### **Expected Response**:

<br>

#### **Status `201 - CREATED`**

```json
{
  "id": "d0980b56-56d8-47bb-b15a-7a5bd4f26074",
  "name": "Joana",
  "number": "1326598745632156",
  "dueDate": "2023-06"
}
```

<br>

### **Error Responses**:

<br>

#### **Status `401 - UNAUTHORIZED`** - "Missing authorization token"

```json
{
  "message": "Missing authorization token"
}
```

<br>

#### **Status `400 - BAD REQUEST`** - "Invalid card number"

```json
{
  "message": "Invalid card number"
}
```

<br>

#### **Status `400 - BAD REQUEST`** - "Date is required"

```json
{
  "message": "Date is required"
}
```

<br>

#### **Status `400 - NOT FOUND`** - "Invalid code number"

```json
{
  "message": "Invalid code number"
}
```

#

## **2.2 Update Payment Data**

[Back to Endpoints](#5-endpoints)

<br>

## PATCH `/paymentInfo/:id`

<br>

### **Request**:

- PATCH /paymentInfo/:id
- Host: https://cine-express-projeto-m4.herokuapp.com/paymentInfo/id
- Authorization: Bearer Token
- Content-type: application/json
- User must be logged at your account

<br>

### **Request headers**:

```json
{
  "authorization": "Bearer Token"
}
```

### **Request body**:

```json
{
  "name": "Joana Maria",
  "number": "1326598745632165",
  "dueDate": "2023-06",
  "code": "369",
  "userId": "e64c6322-2a32-41be-8be9-37da17161ee2"
}
```

<br>

### **Expected Response**:

<br>

#### **Status `200 - OK`**

```json
{
  "id": "d0980b56-56d8-47bb-b15a-7a5bd4f26074",
  "name": "Joana Maria",
  "number": "1326598745632165",
  "dueDate": "2023-06",
  "code": "369"
}
```

<br>

### **Error Responses**:

<br>

#### **Status `401 - UNAUTHORIZED`** - "Missing authorization token"

```json
{
  "message": "Missing authorization token"
}
```

<br>

#### **Status `404 - NOT FOUND`** - "User not found"

```json
{
  "message": "User not found"
}
```

#

## **2.3 List General Payment Data**

[Back to Endpoints](#5-endpoints)

<br>

## GET `/paymentInfo`

<br>

### **Request**:

- GET /paymentInfo
- Host: https://cine-express-projeto-m4.herokuapp.com/paymentInfo
- Authorization: Bearer Token
- Content-type: application/json
- Empty Body
- User must be logged

<br>

### **Request headers**:

```json
{
  "authorization": "Bearer Token"
}
```

<br>

### **Expected Response**:

<br>

#### **Status `200 - OK`**

```json
{
  "id": "d0980b56-56d8-47bb-b15a-7a5bd4f26074",
  "name": "Joana",
  "number": "1326598745632156",
  "dueDate": "2023-06"
}
```

<br>

### **Error Responses**:

<br>

#### **Status `401 - UNAUTHORIZED`** - "Missing authorization token"

```json
{
  "message": "Missing authorization token"
}
```

<br>

#

## **2.4 List Payment Data by Id**

[Back to Endpoints](#5-endpoints)

<br>

## GET `/paymentInfo/:id`

<br>

### **Request**:

- GET /paymentInfo/:id
- Host: https://cine-express-projeto-m4.herokuapp.com/paymentInfo/id
- Authorization: Bearer Token
- Content-type: application/json
- Empty body
- User must be logged

<br>

### **Request headers**:

```json
{
  "authorization": "Bearer Token"
}
```

<br>

### **Expected Response**:

<br>

#### **Status `200 - OK`**

```json
{
  "id": "d0980b56-56d8-47bb-b15a-7a5bd4f26074",
  "name": "Joana",
  "number": "1326598745632156",
  "dueDate": "2023-06"
}
```

<br>

### **Error Responses**:

<br>

#### **Status `401 - UNAUTHORIZED`** - "Missing authorization token"

```json
{
  "message": "Missing authorization token"
}
```

#

## **2.5 Delete Payment Data**

[Back to Endpoints](#5-endpoints)

<br>

## DELETE `/paymentInfo/:id`

<br>

### **Request**:

- DELETE /paymentInfo/id
- Host: https://cine-express-projeto-m4.herokuapp.com/paymeentInfo/id
- Authorization: Bearer Token
- Content-type: application/json
- Empty body
- User must be logged

<br>

### **Request headers**:

```json
{
  "authorization": "Bearer Token"
}
```

<br>

### **Expected Response**:

<br>

#### **Status `204 - No Content`**

```json
No body returned for response
```

<br>

### **Error Responses**:

<br>

#### **Status `401 - UNAUTHORIZED`** - "Missing authorization token"

```json
{
  "message": "Missing authorization token"
}
```

#

## **3**. **CINEMA**

[Back to Endpoints](#3-endpoints)

<br>

The Cinema object is defined as:

| Field | Type   | Description      |
| ----- | ------ | ---------------- |
| id    | string | Unique Cinema Id |
| name  | string | Session Hour     |

<br>

### **Endpoints**

<br>

| Method | Routes      | Description    |
| ------ | ----------- | -------------- |
| POST   | /cinema     | Create user    |
| PATCH  | /cinema/:id | Update session |

---

<br>

## **3.1 Cinema Creation**

[Back to Endpoints](#3-endpoints)

<br>

## POST `/cinema`

<br>

### **Request**:

- POST /cinema
- Host: https://cine-express-projeto-m4.herokuapp.com
- Authorization: Bearer Token
- Content-type: application/json

<br>

### **Request body**:

```json
{
  "name": "Cine Express"
}
```

<br>

### **Expected Response**:

<br>

#### **Status `201 - CREATED`**

```json
{
  "name": "Cine Express",
  "id": 1
}
```

<br>

### **Error Responses**:

<br>

#### **Status `401 - UNAUTHORIZED`** - "Missing authorization token"

```json
{
  "message": "Missing authorization token"
}
```

<br>

#### **Status `400 - BAD REQUEST`** - Missing required field

```json
{
  "message": "Missing required field"
}
```

#

## **3.2 List Cinema**

[Back to Endpoints](#5-endpoints)

<br>

## GET - `/cinema`

<br>

### **Request**:

- GET /cinema
- Host: https://cine-express-projeto-m4.herokuapp.com/movies/
- Authorization: Bearer Token
- Content-type: application/json
- Empty Body

<br>

### **Request headers**:

```json
{
  "authorization": "Bearer Token"
}
```

<br>

### **Expected Response**:

<br>

#### **Status `200 - OK`**

```json
{
  "cinemas": [
    {
      "id": 1,
      "name": "Cine Express"
    },
    {
      "id": 2,
      "name": "Cine Jason Button"
    },
    {
      "id": 3,
      "name": "Cine Jason Button"
    },
    {
      "id": 4,
      "name": "Cine Prive"
    }
  ]
}
```

<br>

### **Error Responses**:

<br>

#### **Status `401 - UNAUTHORIZED`** - "Missing authorization token"

```json
{
  "message": "Missing authorization token"
}
```

#

## **3.3 Update Cinema**

[Back to Endpoints](#3-endpoints)

<br>

## PATCH `/cinema/:id`

<br>

### **Request**:

- PATCH /cinema/:id
- Host: https://cine-express-projeto-m4.herokuapp.com
- Authorization: Bearer Token
- Content-type: application/json
- Body must contain any of the keys
- User must be an Employee

### **Request body**:

```json
{
  "name": "Cine-Express"
}
```

<br>

### **Request headers**:

```json
{
  "authorization": "Bearer Token"
}
```

<br>

### **Expected Response**:

<br>

#### **Status `201 - OK`**

```json
{
  "id": 2,
  "name": "Cine-Express"
}
```

<br>

### **Error Responses**:

<br>

#### **Status `401 - UNAUTHORIZED`** - "Missing authorization token"

```json
{
  "message": "Missing authorization token"
}
```

<br>

#### **Status `400 - BAD REQUEST`** - Missing required field

```json
{
  "message": "Missing required field"
}
```

<br>

#### **Status `404 - NOT FOUND`** - "Cinema not found"

```json
{
  "message": "Cinema not found"
}
```

#

## **4.** **MOVIES**

[Back to Endpoints](#3-endpoints)

<br>

The Movie object is defined as:

| Field      | Type    | Description                                     |
| ---------- | ------- | ----------------------------------------------- |
| id         | string  | Movie unique identifier                         |
| name       | string  | Movie name                                      |
| gender     | string  | Movie gender                                    |
| avaliation | string  | Defines movie avaliation                        |
| duration   | string  | Defines the duration of the movie               |
| onDisplay  | boolean | Define if movie is on display                   |
| cinema     | string  | Define cinema id where movie is being displayed |

<br>

### **Endpoints**

<br>

| Method | Routes            | Description                                   |
| ------ | ----------------- | --------------------------------------------- |
| POST   | /movies           | To create a new                               |
| GET    | /movies           | To list all movies                            |
| GET    | /movies/:movie_id | To list a movie using its ID as a parameter   |
| PATCH  | /movies/:movie_id | To update a movie using its ID as a parameter |
| DELETE | /movies/:movie_id | To delete a movie using its ID as a parameter |

---

<br>

## **4.1 Movie Creation**

[Back to Endpoints](#5-endpoints)

<br>

## POST `/movies`

<br>

### **Request**:

- POST /movies
- Host: https://cine-express-projeto-m4.herokuapp.com/movies
- Authorization: Bearer Token
- Content-type: application/json

<br>

### **Request body**:

```json
{
  "name": "Jason 5",
  "gender": "Horror",
  "avaliation": "4.3",
  "duration": "2:00",
  "onDisplay": true,
  "cinema": "1"
}
```

<br>

### **Expected Response**:

<br>

#### **Status `201 - CREATED`**

```json
{
  "name": "Jason 5",
  "gender": "Horror",
  "avaliation": "4.3",
  "duration": "2:00",
  "onDisplay": true,
  "cinema": {
    "id": 1,
    "name": "Cine Gusta"
  },
  "id": 4
}
```

<br>

### **Error Responses**:

<br>

#### **Status `401 - UNAUTHORIZED`** - "Missing authorization token"

```json
{
  "message": "Missing authorization token"
}
```

<br>

#### **Status `400 - BAD REQUEST`** - Movie already exists

```json
{
  "message": "Movie already exists"
}
```

#

## **4.2 List Movies**

[Back to Endpoints](#5-endpoints)

<br>

## GET `/movies`

<br>

### **Request**:

- GET /movies
- Host: https://cine-express-projeto-m4.herokuapp.com/movies/
- Authorization: Bearer Token
- Content-type: application/json
- Empty Body

<br>

### **Request headers**:

```json
{
  "authorization": "Bearer Token"
}
```

<br>

### **Expected Response**:

<br>

#### **Status `200 - OK`**

```json
[
	{
		"id": 1,
		"name": "Jason 3",
		"gender": "Horror",
		"avaliation": "4.3",
		"duration": "2:00",
		"onDisplay": true,
		"cinema": {
			"id": 1,
			"name": "Cine Gusta"
		}
	}
  ...
]
```

<br>

### **Error Responses**:

<br>

#### **Status `401 - UNAUTHORIZED`** - "Missing authorization token"

```json
{
  "message": "Missing authorization token"
}
```

#

## **4.3 List Movie by Id**

[Back to Endpoints](#5-endpoints)

<br>

## GET `/movies/movieId`

<br>

### **Request**:

- GET /users
- Host: https://cine-express-projeto-m4.herokuapp.com/movies/movieId
- Authorization: Bearer Token
- Content-type: application/json
- Empty Body
- User must be an Adm

<br>

### **Request headers**:

```json
{
  "authorization": "Bearer Token"
}
```

<br>

### **Expected Response**:

<br>

#### **Status `200 - OK`**

```json
{
  "id": 1,
  "name": "Jason 3",
  "gender": "Horror",
  "avaliation": "4.3",
  "duration": "2:00",
  "onDisplay": true,
  "cinema": {
    "id": 1,
    "name": "Cine Gusta"
  }
}
```

<br>

### **Error Responses**:

<br>

#### **Status `401 - UNAUTHORIZED`** - "Missing authorization token"

```json
{
  "message": "Missing authorization token"
}
```

#

## **4.4 Update Movie**

[Back to Endpoints](#5-endpoints)

<br>

## PATCH `/movies/movieId`

<br>

### **Request**:

- PATCH /movies/movieId
- Host: https://cine-express-projeto-m4.herokuapp.com/movies/movieId
- Authorization: Bearer Token
- Content-type: application/json
- User must be an Employee

<br>

### **Request headers**:

```json
{
  "authorization": "Bearer Token"
}
```

### **Request body**:

```json
{
  "name": "Jason 39",
  "gender": "Horror",
  "avaliation": "4.3",
  "duration": "2:00",
  "onDisplay": true,
  "cinema": "1"
}
```

<br>

### **Expected Response**:

<br>

#### **Status `200 - OK`**

```json
{
  "message": {
    "id": 4,
    "name": "Jason 39",
    "gender": "Horror",
    "avaliation": "4.3",
    "duration": "2:00",
    "onDisplay": true,
    "cinema": {
      "id": 1,
      "name": "Cine Gusta"
    }
  }
}
```

<br>

### **Error Responses**:

<br>

#### **Status `401 - UNAUTHORIZED`** - "Missing authorization token"

```json
{
  "message": "Missing authorization token"
}
```

<br>

#### **Status `403 - FORBIDDEN`** - "User is not an admin"

```json
{
  "message": "User is not an adm"
}
```

#

## **4.5 Delete Movie**

[Back to Endpoints](#5-endpoints)

<br>

## DELETE `/movies/movieId`

<br>

### **Request**:

- DELETE /movies/movieId
- Host: https://cine-express-projeto-m4.herokuapp.com/movies/movieId
- Authorization: Bearer Token
- Content-type: application/json
- Empty body
- User must be an Adm

<br>

### **Request headers**:

```json
{
  "authorization": "Bearer Token"
}
```

<br>

### **Expected Response**:

<br>

#### **Status `204 - No Content`**

```json
No body returned for response
```

<br>

### **Error Responses**:

<br>

#### **Status `401 - UNAUTHORIZED`** - "Missing authorization token"

```json
{
  "message": "Missing authorization token"
}
```

<br>

#### **Status `403 - FORBIDDEN`** - "User is not an admin"

```json
{
  "message": "User is not an admin"
}
```

#

## **5.** **ROOMS**

[Back to Endpoints](#3-endpoints)

<br>

The Room object is defined as:

| Field    | Type   | Description                                |
| -------- | ------ | ------------------------------------------ |
| id       | string | Room unique identifier.                    |
| capacity | number | seating capacity in a room.                |
| CinemaId | string | Identification of the cinema that the room |
|          |        | belongs to.                                |

<br>

### **Endpoints**

<br>

| Method | Routes     | Description                                |
| ------ | ---------- | ------------------------------------------ |
| POST   | /rooms     | Create room.                               |
| GET    | /rooms     | List all rooms.                            |
| GET    | /rooms/:id | List a room using its ID as a parameter.   |
| PATCH  | /rooms/:id | Update a room using its ID as a parameter. |

---

<br>

## **5.1 Room Creation**

[Back to Endpoints](#6-endpoints)

<br>

## POST `/rooms`

<br>

### **Request**:

- POST /rooms
- Host: https://cine-express-projeto-m4.herokuapp.com
- Authorization: Bearer Token
- Content-type: application/json

<br>

### **Request body**:

```json
{
  "capacity": 100,
  "cinema": "1"
}
```

<br>

### **Expected Response**:

<br>

#### **Status `201 - CREATED`**

```json
{
  "capacity": 100,
  "cinema": {
    "id": 1,
    "name": "CineGusta"
  },
  "id": 1
}
```

<br>

### **Error Responses**:

<br>

#### **Status `401 - UNAUTHORIZED`** - "Missing authorization token"

```json
{
  "message": "Invalid token"
}
```

<br>

#### **Status `400 - BAD REQUEST`** - Minimum of seats

```json
{
  "message": "Minimum of 30 chairs"
}
```

<br>

#### **Status `400 - BAD REQUEST`** - Maximum of seats

```json
{
  "message": "Maximum of 100 chairs"
}
```

<br>

#### **Status `400 - BAD REQUEST`** - Maximum number of rooms created

```json
{
  "message": "Only 10 rooms can be created"
}
```

<br>

#

## **5.2 List Rooms**

[Back to Endpoints](#5-endpoints)

<br>

## GET `/rooms`

<br>

### **Request**:

- GET /rooms
- Host: https://cine-express-projeto-m4.herokuapp.com
- Authorization: Bearer Token
- Content-type: application/json
- Empty body

<br>

### **Request headers**:

```json
{
  "authorization": "Bearer Token"
}
```

<br>

### **Expected Response**:

<br>

#### **Status `200 - OK`**

```json
[
   {
	"id": 1,
	"capacity": 100,
	"sessions": []
   }
...
]
```

<br>

### **Error Responses**:

<br>

#### **Status `401 - UNAUTHORIZED`** - "Missing authorization token"

```json
{
  "message": "invalid token"
}
```

#

## **5.3 List Room by Id**

[Back to Endpoints](#5-endpoints)

<br>

## GET `/rooms/:id`

<br>

### **Request**:

- GET /rooms/:id
- Host: https://cine-express-projeto-m4.herokuapp.com
- Authorization: Bearer Token
- Content-type: application/json
- Empty body
- User must be an Adm

<br>

### **Request headers**:

```json
{
  "authorization": "Bearer Token"
}
```

<br>

### **Expected Response**:

<br>

#### **Status `200 - OK`**

```json
{
  "id": 1,
  "capacity:": 100,
  "sessions": []
}
```

<br>

### **Error Responses**:

<br>

#### **Status `401 - UNAUTHORIZED`** - "Missing authorization token"

```json
{
  "message": "invalid token"
}
```

<br>

#### **Status `404 - NOT FOUND`** - Invalid Id or room not exists

```json
{
  "message": "Invalid Id or room not exists"
}
```

#

## **5.4 Update Room**

[Back to Endpoints](#5-endpoints)

<br>

## PATCH `/rooms/:id`

<br>

### **Request**:

- PATCH /rooms/:id
- Host: https://cine-express-projeto-m4.herokuapp.com
- Authorization: Bearer Token
- Content-type: application/json
- User must be an Employee and admin

<br>

### **Request headers**:

```json
{
  "authorization": "Bearer Token"
}
```

### **Request body**:

```json
{
  "capacity": 50
}
```

<br>

### **Expected Response**:

<br>

#### **Status `200 - OK`**

```json
{
  "Updated room"
}
```

<br>

### **Error Responses**:

<br>

#### **Status `401 - UNAUTHORIZED`** - "Missing authorization token"

```json
{
  "message": "invalid token"
}
```

<br>

#### **Status `403 - FORBIDDEN`** - "User is not employee"

```json
{
  "message": "User is not employee"
}
```

<br>

#### **Status `403 - FORBIDDEN`** - "User is not Admin"

```json
{
  "message": "User is not Admin"
}
```

<br>

#### **Status `404 - NOT FOUND`** - Room was not found

```json
{
  "message": "Room was not found"
}
```

<br>

#### **Status `400 - BAD REQUEST`** - Minimum limit

```json
{
  "message": "Room cannot have a capacity less than 30"
}
```

<br>

#### **Status `400 - BAD REQUEST`** - Maximum limit

```json
{
  "message": "Room cannot have a capacity above than 100"
}
```

#

## **6.** **SESSIONS**

[Back to Endpoints](#3-endpoints)

<br>

The Session object is defined as:

| Field   | Type   | Description                   |
| ------- | ------ | ----------------------------- |
| id      | string | Unique Session Id             |
| day     | string | Session date                  |
| hour    | string | Session Hour                  |
| roomId  | string | Id of a room already created  |
| movieId | string | Id of a movie already created |

<br>

### **Endpoints**

<br>

| Method | Routes               | Description                              |
| ------ | -------------------- | ---------------------------------------- |
| POST   | /sessions            | Create user                              |
| GET    | /sessions            | List all users                           |
| GET    | /sessions/:movieId   | Lists a user using its ID as a parameter |
| PATCH  | /sessions/:sessionId | Update session                           |
| DELETE | /sessions/:sessionId | Delete session                           |

---

<br>

## **6.1 Session Creation**

[Back to Endpoints](#3-endpoints)

<br>

## POST `/sessions`

<br>

### **Request**:

- POST /sessions
- Host: https://cine-express-projeto-m4.herokuapp.com
- Authorization: None
- Content-type: application/json

<br>

### **Request body**:

```json
{
  "day": "2022/11/12",
  "hour": "13:00",
  "room_id": "1",
  "movie_id": "1"
}
```

<br>

### **Expected Response**:

<br>

#### **Status `201 - CREATED`**

```json
{
  "session": {
    "day": "2022-11-15",
    "hour": "19:00:00",
    "room": {
      "id": 1,
      "capacity": 100
    },
    "movie": {
      "id": 1,
      "name": "A Família Adams",
      "gender": "Comédia",
      "avaliation": "4.9",
      "duration": "1:55",
      "onDisplay": true,
      "cinema": {
        "id": 1,
        "name": "Cine Express"
      }
    },
    "id": 4
  }
}
```

<br>

### **Error Responses**:

<br>

#### **Status `401 - UNAUTHORIZED`** - "Missing authorization token"

```json
{
  "message": "Missing authorization token"
}
```

<br>

#### **Status `400 - BAD REQUEST`** - Missing required field

```json
{
  "message": "Missing required field"
}
```

<br>

#### **Status `400 - BAD REQUEST`** - This room dont exist

```json
{
  "message": "This room dont exist"
}
```

<br>

#### **Status `400 - BAD REQUEST`** - This movie dont exist

```json
{
  "message": "This movie dont exist"
}
```

#

## **6.2 List Sessions**

[Back to Endpoints](#3-endpoints)

<br>

## GET `/sessions`

<br>

### **Request**:

- GET /sessions
- Host: https://cine-express-projeto-m4.herokuapp.com
- Authorization: Bearer Token
- Content-type: application/json
- Empty Body

<br>

### **Request headers**:

```json
{
  "authorization": "Bearer Token"
}
```

<br>

### **Expected Response**:

<br>

#### **Status `200 - OK`**

```json
{
  "sessions": [
    {
      "id": 1,
      "day": "2022-11-16",
      "hour": "19:00:00",
      "room": {
        "id": 7,
        "capacity": 50
      },
      "movie": {
        "id": 2,
        "name": "A Família Buscapé",
        "gender": "Comédia",
        "avaliation": "5.0",
        "duration": "1:58",
        "onDisplay": true,
        "cinema": null
      }
    },
    {
      "id": 2,
      "day": "2022-11-15",
      "hour": "15:00:00",
      "room": {
        "id": 7,
        "capacity": 50
      },
      "movie": {
        "id": 1,
        "name": "A Família Adams",
        "gender": "Comédia",
        "avaliation": "4.9",
        "duration": "1:55",
        "onDisplay": true,
        "cinema": null
      }
    }
  ]
}
```

<br>

### **Error Responses**:

<br>

#### **Status `401 - UNAUTHORIZED`** - "Missing authorization token"

```json
{
  "message": "Missing authorization token"
}
```

#

## **6.3 List Sessions per Movie**

[Back to Endpoints](#3-endpoints)

<br>

## GET `/sessions/movie/:movieId`

<br>

### **Request**:

- GET /sessions/movie/:movieId
- Host: https://cine-express-projeto-m4.herokuapp.com
- Authorization: Bearer Token
- Content-type: application/json
- Empty body

<br>

### **Request headers**:

```json
{
  "authorization": "Bearer Token"
}
```

<br>

### **Expected Response**:

<br>

#### **Status `200 - OK`**

```json
{
  "movie": {
    "id": 2,
    "name": "A Família Buscapé",
    "gender": "Comédia",
    "avaliation": "5.0",
    "duration": "1:58",
    "onDisplay": true,
    "sessions": [
      {
        "id": 1,
        "day": "2022-11-16",
        "hour": "19:00:00",
        "room": {
          "id": 7,
          "capacity": 50
        }
      },
      {
        "id": 3,
        "day": "2022-11-17",
        "hour": "21:00:00",
        "room": {
          "id": 7,
          "capacity": 50
        }
      }
    ],
    "cinema": {
      "id": 1,
      "name": "Cine Express"
    }
  }
}
```

<br>

### **Error Responses**:

<br>

#### **Status `401 - UNAUTHORIZED`** - "Missing authorization token"

```json
{
  "message": "Missing authorization token"
}
```

<br>

#### **Status `404 - NOT FOUND`** - "Movie not found"

```json
{
  "message": "This movie dont exist"
}
```

#

## **6.4 Update Sessions**

[Back to Endpoints](#3-endpoints)

<br>

## PATCH `/sessions/:id`

<br>

### **Request**:

- PATCH /sessions/:id
- Host: https://cine-express-projeto-m4.herokuapp.com
- Authorization: Bearer Token
- Content-type: application/json
- Body must contain any of the keys
- User must be an Employee

<br>

### **Request body**:

```json
{
  "day"?: "2022/11/17",
  "hour"?: "21:00",
  "roomId"?: "7",
  "movieId"?: "2"
}
```

<br>

### **Request headers**:

```json
{
  "authorization": "Bearer Token"
}
```

<br>

### **Expected Response**:

<br>

#### **Status `201 - OK`**

```json
{
  "id": 1,
  "day": "2022-11-15",
  "hour": "15:00:00",
  "room": {
    "id": 1,
    "capacity": 100
  },
  "movie": {
    "id": 1,
    "name": "Jason 2",
    "gender": "Horror",
    "avaliation": "4.3",
    "duration": "2:00",
    "onDisplay": true,
    "cinema": {
      "id": 1,
      "name": "Cine Express"
    }
  }
}
```

<br>

### **Error Responses**:

<br>

#### **Status `401 - UNAUTHORIZED`** - "Missing authorization token"

```json
{
  "message": "Missing authorization token"
}
```

<br>

#### **Status `404 - NOT FOUND`** - "Session not found"

```json
{
  "message": "This session dont exist"
}
```

#

## **6.5 Delete Sessions**

[Back to Endpoints](#3-endpoints)

<br>

## DELETE `/sessions/:id`

<br>

### **Request**:

- DELETE /sessions/:id
- Host: https://cine-express-projeto-m4.herokuapp.com
- Authorization: Bearer Token
- Content-type: application/json
- Empty Body
- User must be an Admin

<br>

### **Request headers**:

```json
{
  "authorization": "Bearer Token"
}
```

<br>

### **Expected Response**:

<br>

#### **Status `204 - NO CONTENT`**

```json
No body returned for response
```

<br>

### **Error Responses**:

<br>

#### **Status `401 - UNAUTHORIZED`** - "Missing authorization token"

```json
{
  "message": "Missing authorization token"
}
```

<br>

#### **Status `404 - NOT FOUND`** - "Session not found"

```json
{
  "message": "Session not found"
}
```

<br>

#### **Status `403 - FORBIDDEN`** - "User is not Admin"

```json
{
  "message": "User is not Admin"
}
```

#

## **7.** **TICKETS**

[Back to Endpoints](#3-endpoints)

<br>

The Ticket object is defined as:

| Field     | Type   | Description                  |
| --------- | ------ | ---------------------------- |
| id        | string | Unique ticket Id             |
| chair     | string | Ticket chair                 |
| sessionId | number | Sessions's unique identifier |
| userId    | string | User's unique identifier     |

<br>

### **Endpoints**

<br>

| Method | Routes       | Description       |
| ------ | ------------ | ----------------- |
| POST   | /tickets     | Create user       |
| GET    | /tickets     | List all tickets  |
| GET    | /tickets/:id | List ticket by id |

---

<br>

## **7.1 Ticket Creation**

[Back to Endpoints](#3-endpoints)

<br>

## POST `/tickets`

<br>

### **Request**:

- POST /tickets
- Host: https://cine-express-projeto-m4.herokuapp.com
- Authorization: Bearer Token
- Content-type: application/json

<br>

### **Request body**:

```json
{
  "chair": "5",
  "session": 2,
  "user": "1597a7b4-24e5-4856-a52c-70576459de11"
}
```

<br>

### **Expected Response**:

<br>

#### **Status `201 - CREATED`**

```json
{
  "id": "d1eaa744-85d5-4eef-8f38-53a92320e786",
  "chair": "5",
  "session": {
    "id": 2,
    "day": "2022-11-10",
    "hour": "15:00:00",
    "room": {
      "id": 14,
      "capacity": 70
    }
  },
  "price": 15
}
```

<br>

### **Error Responses**:

<br>

#### **Status `401 - UNAUTHORIZED`** - "Missing authorization token"

```json
{
  "message": "Missing authorization token"
}
```

<br>

#### **Status `400 - BAD REQUEST`** - Missing required field

```json
{
  "message": "Missing required field"
}
```

<br>

#### **Status `400 - BAD REQUEST`** - Chair already in use

```json
{
  "message": "Chair already in use"
}
```

#

## **7.2 List all Tickets**

[Back to Endpoints](#3-endpoints)

<br>

## GET `/tickets`

<br>

### **Request**:

- PATCH /tickets/
- Host: https://cine-express-projeto-m4.herokuapp.com
- Authorization: Bearer Token
- Content-type: application/json
- Empty Body
- User must be an Employee

<br>

### **Request headers**:

```json
{
  "authorization": "Bearer Token"
}
```

<br>

### **Expected Response**:

<br>

#### **Status `200 - OK`**

```json
[
	{
		"id": "dc750695-f69a-4f79-9a9b-14a705c7a5c1",
		"price": 15,
		"chair": 11,
		"session": {
			"id": 2,
			"day": "2022-11-10",
			"hour": "15:00:00",
			"room": {
				"id": 14,
				"capacity": 70
			}
		}
	},
    ...
]
```

<br>

### **Error Responses**:

<br>

#### **Status `401 - UNAUTHORIZED`** - "Missing authorization token"

```json
{
  "message": "Missing authorization token"
}
```

<br>

#### **Status `401 - UNAUTHORIZED`** - User is not Employee

```json
{
  "message": "User is not employee"
}
```

#

## **7.3 List Ticket by ID**

[Back to Endpoints](#3-endpoints)

<br>

## GET `/tickets/:id`

<br>

### **Request**:

- PATCH /tickets/:id
- Host: https://cine-express-projeto-m4.herokuapp.com
- Authorization: Bearer Token
- Content-type: application/json
- Empty Body

<br>

### **Request headers**:

```json
{
  "authorization": "Bearer Token"
}
```

<br>

### **Expected Response**:

<br>

#### **Status `200 - OK`**

```json
{
	"id": "dc750695-f69a-4f79-9a9b-14a705c7a5c1",
	"price": 15,
	"chair": 11,
	"session": {
		"id": 2,
		"day": "2022-11-10",
		"hour": "15:00:00",
		"room": {
			"id": 14,
			"capacity": 70
		}
	}
},
```

<br>

### **Error Responses**:

<br>

#### **Status `401 - UNAUTHORIZED`** - "Missing authorization token"

```json
{
  "message": "Missing authorization token"
}
```

<br>

#### **Status `404 - NOT FOUND`** - "Ticket not found"

```json
{
  "message": "Ticket not found"
}
```
