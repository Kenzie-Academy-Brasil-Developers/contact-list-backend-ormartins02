<h1 align ='center'> <strong>API Documentation<strong> </h1>

## **Content Table**

- [1. Overview](#1-overview)
- [2. Entity Relationship Diagram](#2-entity-relationship-diagram)
- [3. Endpoints](#3-endpoints)
- [4. Authetication](#4-authentication)

<br>

---

## **1. Overview**

Contact list is an API that consists of creating users and their respective contacts..

These were the main technologies used in this project:

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Jest](https://jestjs.io/)

<!-- **Base URL: https://cine-express-projeto-m4.herokuapp.com** -->

### **Team**

> - [Ricardo Martins](https://www.linkedin.com/in/ormartins02/) - Dev

<br>

## **2. Entity Relationship Diagram**

[ Back to the top ](#content-table)

![Diagram](diagram_contact_list.png)

<br>

## **3. Endpoints**

[Back to the top](#content-table)

### Index

- [User](#1-users)
- [Contact](#2-contacts)
- [Session](#3-sessions)
- [Profile](#4-profile)

<br>

## **4. Authentication**

[ Back to the top ](#content-table)

Some routes need authentication. The authentication used is the **Bearer Token** type.

The token is generated automatically at **user login**.

Thus, to access routes with authentication, it is necessary to have a user and be logged in with the user.

Also, some routes require the user to be an admin, user, or owner of the contact.

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
| phone      | string   | Contact Phone \*                                  |
| password   | string   | User password \*                                  |
| isAdm      | boolean  | Defines whether a user is an administrator or not |
| createdAt  | string   | Date when the user was created                    |
---

<br>

<br>

### **Endpoints**

<br>

| Method | Routes      | Description                              |
| ------ | ----------- | ---------------------------------------- |
| POST   | /users      | Create user                              |
| GET    | /users      | List all users                           |
| GET    | /users/:id  | Lists a user using its ID as a parameter |
| PATCH  | /user/:id   | Update user                              |
| DELETE | /delete/:id | Delete user                              |

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
  "name": "Ricardo",
  "email": "ricardo@mail.com",
  "phone": "0xx 9xxxx-xxxx",
  "password": "1234",
  "isAdm": true
}
```

<br>

### **Expected Response**:

<br>

#### **Status `201 - CREATED`**

```json
{

  {
    "id": "7fd311fe-f80a-465e-9ed9-8bb4e28bbf45",
    "name": "Ricardo",
    "email": "ricardo@mail.com",
    "phone" : "0xx 9xxxx-xxxx",
    "isAdm": true,
    "createdAt": "2022-10-29T00:41:28.717Z",
  }
}
```

<br>

### **Error Responses**:

<br>


#### **Status `409 - CONFLICTS`** - Email already exists

```json
{
  "message": "This email already exists"
}
```

#

<br>

## **1.2 List Users**

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
    "id": "7fd311fe-f80a-465e-9ed9-8bb4e28bbf45",
    "name": "Ricardo",
    "email": "ricardo@mail.com",
    "phone" : "0xx 9xxxx-xxxx",
    "isAdm": true,
    "createdAt": "2022-10-29T00:41:28.717Z",
    }
    ...
  ]
}
```

<br>

### **Error Responses**:

<br>

#### **Status `401 - UNAUTHORIZED`** - "Token required"

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

## **1.3 List User by Id**

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
- User must be an Adm or User common

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
    "id": "7fd311fe-f80a-465e-9ed9-8bb4e28bbf45",
    "name": "Ricardo",
    "email": "ricardo@mail.com",
    "phone" : "0xx 9xxxx-xxxx",
    "isAdm": true,
    "createdAt": "2022-10-29T00:41:28.717Z",
    "contacts": []
    }
}
```

<br>

### **Error Responses**:

<br>

#### **Status `401 - UNAUTHORIZED`** - "Token required"

```json
{
  "message": "Missing authorization token"
}
```

<br>

#

## **1.4 Update User by Id**

[Back to Endpoints](#3-endpoints)

<br>

## PATCH `/users/:id`

<br>

### **Request**:

- PATCH /users/:id
- Host: https://cine-express-projeto-m4.herokuapp.com
- Authorization: Bearer Token
- Content-type: application/json
- User must be an Adm and common User

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
    "name": "Ricardo Martins",
    "phone" : "0xx 98xxx-xxxx",
    "email": "ricardo2@mail.com",
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

#### **Status `401 - UNAUTHORIZED`** - "Only admin can update or delete other users"

```json
{
  "message": "Only admin can update or delete other users"
}
```

#

## **1.5 Delete User by Id**

[Back to Endpoints](#3-endpoints)

<br>

## DELETE `/users/:id`

<br>

### **Request**:

- DELETE /users/:id
- Host: https://cine-express-projeto-m4.herokuapp.com
- Authorization: Bearer Token
- Content-type: application/json
- User must be an Adm and common User
  
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

#### **Status `403 - FORBIDDEN`** - "Only admin can update or delete other users"

```json
{
  "message": "Only admin can update or delete other users"
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

## **2.** **Contacts**

[Back to Endpoints](#3-endpoints)

<br>

The User object is defined as:

| Field      | Type     | Description                                       |
| ---------- | -------- | ------------------------------------------------- |
| id         | string   | Contact unique identifier                         |
| name       | string   | Contact name \*                                   |
| email      | string   | Contact email \*                                  |
| phone      | string   | Contact Phone \*                                  |
| user       | string   | Defines which user owns this contact              |
| createdAt  | string   | Date when the contact was created                 |

<br>

<br>

### **Endpoints**

<br>

| Method | Routes        | Description                              |
| ------ | -----------   | ---------------------------------------- |
| POST   | /contacts     | Create contacts                          |
| GET    | /contacts     | List all contacts                        |
| PATCH  | /contacts/:id | Update contacts                          |
| DELETE | /contacts/:id   | Delete contacts                        |

---

<br>

## POST `/contacts`

<br>

### **Request**:

- POST /contacts
- Host: https://cine-express-projeto-m4.herokuapp.com
- Authorization: None
- Content-type: application/json

<br>

### **Request body**:

```json
{
  "name": "Guilherme",
  "email": "guilherme@mail.com",
  "phone": "0xx 9xxxx-xxxx",
}
```

<br>

### **Expected Response**:

<br>

#### **Status `201 - CREATED`**

```json
{

  {
	  "id": "341f4ee4-8d77-4866-bf47-8d3e32d531e8",
    "name": "Guilherme Martins",
    "email": "guilherme@mail.com",
    "phone": "11999897898",
    "user": "7fd311fe-f80a-465e-9ed9-8bb4e28bbf45",
    "createdAt": "2023-02-08T03:23:20.977Z"
  }
}
```

<br>

### **Error Responses**:

<br>


#### **Status `409 - CONFLICTS`** - You already have this contact


```json
{
  "message": "You already have this contact"
}
```
### If that contact is already on your list.
### Different users can have the same contact.

#

<br>

## **1.2 List Contacts**

[Back to Endpoints](#3-endpoints)

<br>

## GET `/contacts`

<br>

### **Request**:

- GET /contacts
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
      "id": "341f4ee4-8d77-4866-bf47-8d3e32d531e8",
      "name": "Guilherme Martins",
      "email": "guilherme@mail.com",
      "phone": "11999897898",
      "user": "7fd311fe-f80a-465e-9ed9-8bb4e28bbf45",
      "createdAt": "2023-02-08T03:23:20.977Z"
    }
    ...
  ]
}
```

<br>

### **Error Responses**:

<br>

#### **Status `401 - UNAUTHORIZED`** - "Token required"

```json
{
  "message": "Token required."
}
```

<br>

#### **Status `403 - UNAUTHORIZED`** - "User is not admin"

```json
{
  "message": "User is not an admin"
}
```

#

## **1.3 Update Contact by Id**

[Back to Endpoints](#3-endpoints)

<br>

## PATCH `/contacts/:id`

<br>

### **Request**:

- PATCH /contacts/:id
- Host: https://cine-express-projeto-m4.herokuapp.com
- Authorization: Bearer Token
- Content-type: application/json
- User must be an Adm and common User

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
    "name": "Guilherme Martins",
    "phone" : "0xx 97xxx-xxx2",
    "email": "guilherme.martins@mail.com",
  }
}
```

<br>

### **Error Responses**:

<br>

#### **Status `401 - UNAUTHORIZED`** - "Missing authorization token"

```json
{
  "message": "Token required"
}
```

<br>

#### **Status `401 - UNAUTHORIZED`** - "You can only edit your own contact"

```json
{
  "message": "You can only edit your own contact"
}
```

<br>

#### **Status `404 - NOT FOUND`** - "This contact dont exist"

```json
{
  "message": "This contact dont exist"
}
```

#

## **1.4 Delete User by Id**

[Back to Endpoints](#3-endpoints)

<br>

## DELETE `/contacts/:id`

<br>

### **Request**:

- DELETE /contacts/:id
- Host: https://cine-express-projeto-m4.herokuapp.com
- Authorization: Bearer Token
- Content-type: application/json
- User must be an Adm and common User
  
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

#### **Status `401 - UNAUTHORIZED`** - "You can only update or delete your own contact"

```json
{
  "message": "You can only update or delete your own contact"
}
```

### **Status `404 - Not Found`** - "Contact not found"

```json
{
  "message": "Contact not found"
}
```

#


## **3.** **SESSIONS**

[Back to Endpoints](#3-endpoints)

<br>

The Session object is defined as:

| Field    | Type   | Description                   |
| -------- | ------ | ----------------------------- |
| email    | string | Registered user email         |
| password | string | Registered user password      |

<br>

### **Endpoints**

<br>

| Method | Routes               | Description                              |
| ------ | -------------------- | ---------------------------------------- |
| POST   | /sessions            | Create user                              |


---

<br>

## **3.1 Session**

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
  "email": "ricardo@gmail.com",
	"password": "123456"
}
```

<br>

### **Expected Response**:

<br>

#### **Status `200 - OK`**

```json
{
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc4NWFjMDRmLWE4NWMtNGJlMy05YTc5LTY3NmFjYzZhYmUyYiIsImlzQWRtIjp0cnVlLCJpYXQiOjE2NzU4MjQyMDQsImV4cCI6MTY3NTkxMDYwNCwic3ViIjoiNzg1YWMwNGYtYTg1Yy00YmUzLTlhNzktNjc2YWNjNmFiZTJiIn0.2Fwg3Fl4DBJcbZyR3mMSyJ76wV7BI-HQrCGZBYQYdX8"
  }
}
```

<br>

### **Error Responses**:

<br>

#### **Status `403 - FORBIDDEN`** - "Missing authorization token"

```json
{
	"message": "Invalid user or password"
}
```

#


## **4.** **PROFILE**

[Back to Endpoints](#4-profiles)

<br>

### **Endpoints**

<br>

| Method | Routes               | Description                                        |
| ------ | -------------------- | -------------------------------------------------  |
| GET    | /profile             | Get all data from the user who owns the token      |

---

<br>

## **6.1 Profile**

[Back to Endpoints](#3-endpoints)

<br>

## POST `/profile`

<br>

### **Request**:

- GET /profile
- Host: https://cine-express-projeto-m4.herokuapp.com
- Authorization: Bearer Token
- Content-type: application/json

<br>

### **No body Request**:

<br>

### **Expected Response**:

<br>

#### **Status `200 - OK`**

```json
{
  {
    "id": "7fd311fe-f80a-465e-9ed9-8bb4e28bbf45",
    "name": "Ricardo",
    "email": "ricardo@mail.com",
    "phone" : "0xx 9xxxx-xxxx",
    "isAdm": true,
    "createdAt": "2022-10-29T00:41:28.717Z",
    "contacts": []
  }
}
```

<br>

### **Error Responses**:

<br>

#### **Status `403 - FORBIDDEN`** - "Missing authorization token"

<br>
<br>

# Getting Started with DOCKER

## Available Scripts

In the project directory, you can run:

### `docker-compose up`