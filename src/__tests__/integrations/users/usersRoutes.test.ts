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
  });
  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /users -> Must be able to create a user admin", async () => {
    const response = await request(app).post("/users").send(mockedUserAdm);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("isAdm");
    expect(response.body).toHaveProperty("phone");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body.name).toEqual("Ricardo Martins");
    expect(response.body.email).toEqual("ricardo@mail.com");
    expect(response.body.isAdm).toEqual(true);
    expect(response.body.phone).toEqual("11999888666");
    expect(response.status).toBe(201);
  });

  test("POST /users -> Must be able to create a user no admin", async () => {
    const response = await request(app).post("/users").send(mockedUserNoAdm);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("isAdm");
    expect(response.body).toHaveProperty("phone");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body.name).toEqual("Janaína Martins");
    expect(response.body.email).toEqual("janaina@mail.com");
    expect(response.body.isAdm).toEqual(false);
    expect(response.body.phone).toEqual("11913434556");
    expect(response.status).toBe(201);
  });

  test("POST /users -> Must not be able to create a user that already exists", async () => {
    const response = await request(app).post("/users").send(mockedUserAdm);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });

  test("POST /users -> Must not be able to create a other user that already exists", async () => {
    const response = await request(app).post("/users").send(mockedUserNoAdm);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });

  test("GET /users ->  Must be able to list all users", async () => {
    const adminLoginResponse = await request(app)
      .post("/session")
      .send(mockedAdmLogin);

    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveLength(2);
  });

  test("GET /users ->  Must not be able to list all users why is not admin", async () => {
    const adminLoginResponse = await request(app)
      .post("/session")
      .send(mockedNoAdmLogin);
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("User is not admin");
    expect(response.status).toBe(403);

  });

  test("GET /users ->  Must not be able to list all users without token", async () => {
    await request(app).post("/login").send(mockedAdmLogin);
    const response = await request(app)
      .get("/users");
    
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("Invalid token");
    expect(response.status).toBe(401);

  });
  
  test("GET /users/:id ->  Must be able list your own user with your contacts", async () => {
    const adminLoginResponse = await request(app)
      .post("/session")
      .send(mockedAdmLogin);

    const users = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

      const noAdminLoginResponse = await request(app)
      .post("/session")
      .send(mockedNoAdmLogin);
      
    const response = await request(app)
    .get(`/users/${users.body[1].id}`)
    .set("Authorization", `Bearer ${noAdminLoginResponse.body.token}`);


    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("isAdm");
    expect(response.body).toHaveProperty("phone");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("contacts");
    expect(response.body.id).toEqual(users.body[1].id);
    expect(response.body.name).toEqual("Janaína Martins");
    expect(response.body.email).toEqual("janaina@mail.com");
    expect(response.body.isAdm).toEqual(false);
    expect(response.body.phone).toEqual("11913434556");
    expect(response.status).toBe(200);
  });

  
  test("PATCH /users/:id ->  Must not be able to update user without authentication", async () => {
    const adminLoginResponse = await request(app)
    .post("/session")
    .send(mockedAdmLogin);

  const users = await request(app)
    .get("/users")
    .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

  await request(app)
    .post("/session")
    .send(mockedNoAdmLogin);
    
  const response = await request(app)
    .patch(`/users/${users.body[1].id}`)

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
      .patch(`/users/${users.body[1].id}22`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("PATCH /users/:id -> Must be able to update own user", async () => {
    const newValues = { name: "Janaína de Cássia Martins" };

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
      .patch(`/users/${users.body[1].id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(newValues)

    expect(response.body).toHaveProperty("name");
    expect(response.body.name).toEqual("Janaína de Cássia Martins");
    expect(response.status).toBe(200);
  });

  test("PATCH /users/:id -> Must be able to update user with admin authentication", async () => {
    const newValues = { name: "Janaína de Castro Martins" };

    const adminLoginResponse = await request(app)
      .post("/session")
      .send(mockedAdmLogin);

    const users = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const token = `${adminLoginResponse.body.token}`
      
    const response = await request(app)
      .patch(`/users/${users.body[1].id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(newValues)

    expect(response.body).toHaveProperty("name");
    expect(response.body.name).toEqual("Janaína de Castro Martins");
    expect(response.status).toBe(200);
  });

  test("DELETE /users/:id ->  Must not be able to delete user without authentication", async () => {
    const adminLoginResponse = await request(app)
    .post("/session")
    .send(mockedAdmLogin);

  const users = await request(app)
    .get("/users")
    .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

  await request(app)
    .post("/session")
    .send(mockedNoAdmLogin);
    
  const response = await request(app)
  .delete(`/users/${users.body[1].id}`)

  expect(response.body).toHaveProperty("message");
  expect(response.body.message).toEqual("Invalid token");
  expect(response.status).toBe(401);

  });

  test("DELETE /users/:id -> Must not be able to delete user with invalid id", async () => {
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
    .delete(`/users/${users.body[1].id}22`)
    .set("Authorization", `Bearer ${token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("DELETE /users/:id -> Must be able to delete own user", async () => {
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
      .delete(`/users/${users.body[1].id}`)
      .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(204);
  });

  test("POST /users -> Must be able to create a new user no admin", async () => {
    const response = await request(app).post("/users").send(mockedUserNoAdm);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("isAdm");
    expect(response.body).toHaveProperty("phone");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body.name).toEqual("Janaína Martins");
    expect(response.body.email).toEqual("janaina@mail.com");
    expect(response.body.isAdm).toEqual(false);
    expect(response.body.phone).toEqual("11913434556");
    expect(response.status).toBe(201);
  });
  
  test("DELETE /users/:id -> Must be able admin to delete other user", async () => {
    const adminLoginResponse = await request(app)
      .post("/session")
      .send(mockedAdmLogin);

    const users = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const token = `${adminLoginResponse.body.token}`
      
    const response = await request(app)
      .delete(`/users/${users.body[1].id}`)
      .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(204);
  });
  
});
