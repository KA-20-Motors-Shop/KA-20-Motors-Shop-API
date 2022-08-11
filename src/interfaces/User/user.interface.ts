import User from "../../models/User";

export type IUserCreation = Omit<User, "id">;

export type IUserResponse = Omit<User, "password">;

export type IIDObject = {user_id: string}

export type IUpdateUser =  {
    name?: string;
    email?: string;
    cpf?: string;
    birthdate?: string;
    celphone?: string;
    description?: string;
    state?: string;
    city?: string;
    CEP?: string;
    street?: string;
    number?: number;
    complement?: string;
    password?:string;
}