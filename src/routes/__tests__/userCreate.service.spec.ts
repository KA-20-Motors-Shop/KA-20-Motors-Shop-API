import userCreateService from "../../services/users/users.create.service";
import { AppDataSource } from "../../data-source";
import { DataSource } from "typeorm";

describe("Create an user", () => {
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

  test("Should insert the information of the new user in the database", async () => {
    const userData = {
      email: "a@a.com",
      name: "Ag",
      cpf: "30000000",
      birthdate: "1000-01-01",
      celphone: "999999999",
      description: "aaaaaa",
      state: "RS",
      city: "Imbe",
      CEP: "90000-00",
      street: "Rua blabla",
      number: 1111,
      complement: "none",
      password: "1234",
      accountType: "seller",
    };

    const newUser = await userCreateService(userData);

    expect(newUser.email).toEqual("a@a.com");
  });
});
