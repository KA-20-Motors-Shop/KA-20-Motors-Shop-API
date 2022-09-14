import app from "../../app";
import { AppDataSource } from "../../data-source";
import { DataSource } from "typeorm";
import request from "supertest";
import userCreateService from "../../services/users/users.create.service";

describe("Create, read ads", () => {
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

  test("Should insert new ad information ", async () => {
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

    const user = await userCreateService(userData);

    const adData = {
      adType: "sell",
      title: "Vend carro",
      year: 2011,
      mileage: 4000,
      price: 40000.0,
      description: "De fato é um carro",
      vehicleType: "Car",
      image: "imageban/21938jdsk",
      isActive: true,
      gallery: ["http://www.imageban.com/93487shdjsh82"],
      user: { id: user.id },
    };

    const response = await request(app).post("/ads").send(adData);

    expect(response.status).toBe(201);
  });

  test("Should be able to return a list ads", async () => {
    const response = await request(app).get("/ads");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("map");
  });
});
