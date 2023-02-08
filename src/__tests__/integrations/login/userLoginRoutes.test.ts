import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { 
    mockedUserAdm, 
    mockedUserNoAdm, 
    mockedAdmLogin, 
    mockedNoAdmLogin,  
} from "../../mocks";

describe("/login", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/users").send(mockedUserAdm);
    await request(app).post("/users").send(mockedUserNoAdm);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /session -  should be able to login with the user", async () => {
    const response = await request(app).post("/session").send(mockedAdmLogin);

    expect(response.body).toHaveProperty("token");
    expect(response.status).toBe(200);
  });

  test("POST /session -  should not be able to login with the user with incorrect password or email", async () => {
    const response = await request(app).post("/session").send({
      email: "jason_buton@mail.com",
      password: "1234567",
    });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  
  test("POST /session -  should be able to login with the user", async () => {
    const response = await request(app).post("/session").send(mockedNoAdmLogin);

    expect(response.body).toHaveProperty("token");
    expect(response.status).toBe(200);
  });

  test("POST /session -  should not be able to login with the user with incorrect password or email", async () => {
    const response = await request(app).post("/session").send({
      email: "jason_buton2@mail.com",
      password: "12345",
    });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });
});
