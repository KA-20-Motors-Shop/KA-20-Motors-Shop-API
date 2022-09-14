import app from "../../app";
import { AppDataSource } from "../../data-source";
import { DataSource } from "typeorm";
import request from "supertest";

describe("Create, read users", () => {
  let connection: DataSource;

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

  test("Should insert new user information ", async () => {
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

    const response = await request(app).post("/users").send(userData);

    expect(response.status).toBe(201);

    expect(response.body.email).toEqual("test@test.com");
  });

  test("Should be able to return a list users", async () => {
    const response = await request(app).get("/users");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("map");
  });
});
