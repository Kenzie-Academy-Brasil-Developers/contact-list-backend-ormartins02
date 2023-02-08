import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import {
  mockedUserAdm, 
  mockedUserNoAdm, 
  mockedAdmLogin, 
  mockedNoAdmLogin, 
  mockedContact1, 
  mockedContact2, 
  mockedContact3, 
  mockedContact4,
} from "../../mocks";
import app from "../../../app";

describe("/users", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((error) => {
        console.error("Error during Data Source initialization", error);
      });

      await request(app).post("/users").send(mockedUserAdm);
      await request(app).post("/users").send(mockedUserNoAdm);
  });
  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /contacts -> Must be able to create a contact 1 with admin authorization", async () => {
    const adminLoginResponse = await request(app)
    .post("/session")
    .send(mockedAdmLogin);

    const response = await request(app)
    .post("/contacts")
    .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
    .send(mockedContact1);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("phone");
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body.name).toEqual("Guilherme Martins");
    expect(response.body.email).toEqual("guilherme@mail.com");
    expect(response.body.phone).toEqual("11999897898");
    expect(response.status).toBe(201);
  });

  test("POST /contacts -> Must be able to create a contact 2 with admin authorization", async () => {
    const adminLoginResponse = await request(app)
    .post("/session")
    .send(mockedAdmLogin);

    const response = await request(app)
    .post("/contacts")
    .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
    .send(mockedContact2);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("phone");
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body.name).toEqual("Henrique Martins");
    expect(response.body.email).toEqual("henrique@mail.com");
    expect(response.body.phone).toEqual("11999897899");
    expect(response.status).toBe(201);
  });

  test("POST /contacts -> Must be able to create a contact 3 with user no admin authorization", async () => {
    const adminLoginResponse = await request(app)
    .post("/session")
    .send(mockedNoAdmLogin);

    const response = await request(app)
    .post("/contacts")
    .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
    .send(mockedContact3);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("phone");
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body.name).toEqual("Gabriela Martins");
    expect(response.body.email).toEqual("gabriela@mail.com");
    expect(response.body.phone).toEqual("11999897900");
    expect(response.status).toBe(201);
  });

  test("POST /contacts -> Must be able to create a contact 4 with user no admin authorization", async () => {
    const adminLoginResponse = await request(app)
    .post("/session")
    .send(mockedNoAdmLogin);

    const response = await request(app)
    .post("/contacts")
    .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
    .send(mockedContact4);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("phone");
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body.name).toEqual("Isabela Martins");
    expect(response.body.email).toEqual("isabela@mail.com");
    expect(response.body.phone).toEqual("11999897901");
    expect(response.status).toBe(201);
  });

  test("POST /contacts -> Must not be able to create twice the same contact by the user", async () => {
    const adminLoginResponse = await request(app)
    .post("/session")
    .send(mockedNoAdmLogin);

    const response = await request(app)
    .post("/contacts")
    .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
    .send(mockedContact4);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("You already have this contact");
    expect(response.status).toBe(409);
  });


  test("GET /contacts ->  Must be able to list all contacts with admin authorization", async () => {
    const adminLoginResponse = await request(app)
      .post("/session")
      .send(mockedAdmLogin);

    const response = await request(app)
      .get("/contacts")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveLength(4);
  });

  test("GET /contacts ->  Must not be able to list all users why is not admin", async () => {
    const adminLoginResponse = await request(app)
      .post("/session")
      .send(mockedNoAdmLogin);
    const response = await request(app)
      .get("/contacts")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("User is not admin");
    expect(response.status).toBe(403);

  });

  test("GET /contacts ->  Must not be able to list all contacts without token", async () => {
    await request(app).post("/login").send(mockedAdmLogin);
    const response = await request(app)
      .get("/contacts");
    
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("Invalid token");
    expect(response.status).toBe(401);

  });
  
  test("PATCH /contacts/:id ->  Must not be able to update contact without authentication", async () => {
    const adminLoginResponse = await request(app)
    .post("/session")
    .send(mockedAdmLogin);

  const contacts = await request(app)
    .get("/contacts")
    .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

  const response = await request(app)
    .patch(`/contacts/${contacts.body[0].id}`)

  expect(response.body).toHaveProperty("message");
  expect(response.body.message).toEqual("Invalid token");
  expect(response.status).toBe(401);

  });

  test("PATCH /users/:id -> Must not be able to update user with invalid id", async () => {
    const adminLoginResponse = await request(app)
      .post("/session")
      .send(mockedAdmLogin);

    const users = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const noAdminLoginResponse = await request(app)
      .post("/session")
      .send(mockedNoAdmLogin);

    const token = `${noAdminLoginResponse.body.token}`
      
    const response = await request(app)
      .patch(`/contacts/${users.body[0].id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("This contact dont exist");
    expect(response.status).toBe(404);
  });

  test("PATCH /contacts/:id -> Must be able to update own contact", async () => {
    const newValues = { name: "Gustavo Martins" };

    const adminLoginResponse = await request(app)
      .post("/session")
      .send(mockedAdmLogin);

    const contacts = await request(app)
      .get("/contacts")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const token = `${adminLoginResponse.body.token}`
      
    const response = await request(app)
      .patch(`/contacts/${contacts.body[0].id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(newValues)

    expect(response.body).toHaveProperty("name");
    expect(response.body.name).toEqual("Gustavo Martins");
    expect(response.status).toBe(200);
  });

});
