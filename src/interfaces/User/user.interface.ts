import User from "../../models/User";

export type IUserCreation = Omit<User, "id">;
