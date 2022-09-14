import bcrypt from "bcrypt";
import app from "../../app";
import { AppDataSource } from "../../data-source";
import { DataSource } from "typeorm";
import request from "supertest";
import userCreateService from "../../services/users/users.create.service";

describe("Login and authentication routes", () => {
  let connection: DataSource;

  let jsonwebtoken = require("jsonwebtoken");

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during data source initialization", err)
      );
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Login returning token", async () => {
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

    await request(app).post("/users").send(userData);

    const response = await request(app).post("/users/login").send(loginData);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  // test("Update user information with auth", async () => {
  //   let auth: { [k: string]: any } = {};
  //   const userData = {
  //     email: "teste@teste.com",
  //     name: "Ag",
  //     cpf: "30000000",
  //     birthdate: "1000-01-01",
  //     celphone: "999999999",
  //     description: "a",
  //     state: "RS",
  //     city: "Imbe",
  //     CEP: "90000-00",
  //     street: "Rua blabla",
  //     number: 1111,
  //     complement: "none",
  //     password: "1234",
  //     accountType: "seller",
  //   };

  //   const postUser = await request(app).post("/users").send(userData);

  //   console.log(postUser);

  //   const newData = {
  //     name: "Agne",
  //   };

  //   const loginData = {
  //     email: "teste@teste.com",
  //     password: "1234",
  //   };

  //   const responseToken = await request(app)
  //     .post("/users/login")
  //     .send(loginData);

  //   auth.token = responseToken.body.token;
  //   auth.current_user_id = jsonwebtoken.decode(auth.token).user_id;

  //   const response = await request(app)
  //     .patch("/users/auth")
  //     .send(newData)
  //     .set("authorization", `Bearer ${auth.token}`);

  //   console.log(response);

  //   expect(response.statusCode).toBe(200);
  // });
});
