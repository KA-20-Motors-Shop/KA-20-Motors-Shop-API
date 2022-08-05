import Ad from "../../models/Ad";

export type IAdCreation = Omit<Ad, "id">;
