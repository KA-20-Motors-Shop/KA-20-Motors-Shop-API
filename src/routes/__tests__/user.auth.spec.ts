import bcrypt from "bcrypt";
import app from "../../app";
import { AppDataSource } from "../../data-source";
import { DataSource } from "typeorm";
import request from "supertest";
import userCreateService from "../../services/users/users.create.service";

let auth: { [k: string]: any } = {};

let jsonwebtoken = require("jsonwebtoken");

describe("Create, read, update, delete users", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during data source initialization", err)
      );
  });

  beforeEach(async () => {
    const userData = {
      email: "test@test.com",
      name: "Ag",
      cpf: "30000000",
      birthdate: "1000-01-01",
      celphone: "999999999",
      description: "a",
      state: "RS",
      city: "Imbe",
      CEP: "90000-00",
      street: "Rua blabla",
      number: 1111,
      complement: "none",
      password: "1234",
      accountType: "seller",
    };
    const loginData = {
      email: "test@test.com",
      password: "1234",
    };

    const user = await userCreateService(userData);
    const response = await request(app).post("/users/login").send(loginData);

    auth.token = response.body.token;
    auth.current_user_id = jsonwebtoken.decode(auth.token).user_id;
  });

  afterAll(async () => {
    await connection.destroy();
  });

  afterEach(async () => {
    await connection.destroy();
  });

  test("Update user information with auth", async () => {
    const newData = {
      email: "test2@test2.com",
      name: "Agnes",
    };

    const response = await request(app)
      .patch("/users/auth")
      .send(newData)
      .set("authorization", auth.token);

    expect(response.body.length).toBe(1);
    expect(response.statusCode).toBe(200);
  });

  test("Update user information without auth", async () => {
    const newData = {
      email: "test2@test2.com",
      name: "Agnes",
    };

    const response = await request(app).patch("/users/auth").send(newData);

    expect(response.statusCode).toBe(401);
  });
});
