import userCreateService from "../../../services/users/users.create.service";

describe("Create an user", () => {
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

    expect(newUser).toEqual(expect.objectContaining({ email: "a@a.com" }));
  });
});
