import User from "../../models/User";

export type IUserCreation = Omit<User, "id" | "ads" | "comments">;

export type IUserResponse = Omit<User, "password">;

export type IIDObject = { user_id: string };

export type IUpdateUser = {
  user_id: string;
  name?: string;
  email?: string;
  cpf?: string;
  celphone?: string;
  birthdate?: string;
  description?: string;
  CEP?: string;
  state?: string;
  city?: string;
  street?: string;
  number?: number;
  complement?: string;
  password?: string;
};

export type IUserLogin = {
  email: string;
  password: string;
};
